const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const pool = require("./database");

const app = express();

const PORT =
    process.env.PORT || 3000;


// ==========================================
// CONFIGURAÇÕES
// ==========================================

app.use(
    cors({
        origin: [
            "https://conta-e-conto.vercel.app",
            "http://127.0.0.1:5500",
            "http://localhost:5500"
        ],

        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS"
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

app.use(express.json());

// ==========================================
// AUTENTICAÇÃO JWT
// ==========================================

function autenticarToken(req, res, next) {

    const autorizacao = req.headers["authorization"];

    if (!autorizacao) {

        return res.status(401).json({

            message: "Token não fornecido."

        });

    }


    const partes = autorizacao.split(" ");

    const token = partes[1];


    if (!token) {

        return res.status(401).json({

            message: "Token inválido."

        });

    }


    try {

        const usuario = jwt.verify(

            token,

            process.env.JWT_SECRET

        );


        req.usuario = usuario;

        next();

    }

    catch (error) {

        return res.status(403).json({

            message: "Token inválido ou expirado."

        });

    }

}

// ==========================================
// TESTAR AUTENTICAÇÃO
// ==========================================

app.get(
    "/api/perfil",
    autenticarToken,
    async (req, res) => {

        try {

            const [usuarios] = await pool.query(

                "SELECT id, username, data_cadastro FROM usuarios WHERE id = ?",

                [req.usuario.id]

            );


            if (usuarios.length === 0) {

                return res.status(404).json({

                    message: "Usuário não encontrado."

                });

            }


            res.json({

                usuario: usuarios[0]

            });

        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                message: "Erro interno do servidor."

            });

        }

    }
);

// ==========================================
// ROTA INICIAL
// ==========================================

app.get("/", (req, res) => {

    res.json({
        message: "API Conta & Conto funcionando!"
    });

});


// ==========================================
// TESTE DO BANCO
// ==========================================

app.get("/api/teste-banco", async (req, res) => {

    try {

        const [resultado] =
            await pool.query("SELECT 1 AS teste");

        res.json({

            message: "Banco de dados conectado!",

            resultado: resultado[0].teste

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Erro ao conectar ao banco."

        });

    }

});
// ==========================================
// CADASTRAR USUÁRIO
// ==========================================

app.post("/api/usuarios", async (req, res) => {

    try {

        const { username, senha } = req.body;


        // Verificar se os dados foram enviados

        if (!username || !senha) {

            return res.status(400).json({

                message: "Usuário e senha são obrigatórios."

            });

        }


        // Verificar tamanho do usuário

        if (username.length < 3) {

            return res.status(400).json({

                message: "O usuário deve ter pelo menos 3 caracteres."

            });

        }


        // Verificar tamanho da senha

        if (senha.length < 4) {

            return res.status(400).json({

                message: "A senha deve ter pelo menos 4 caracteres."

            });

        }


        // Verificar se o usuário já existe

        const [usuarios] = await pool.query(

            "SELECT id FROM usuarios WHERE username = ?",

            [username]

        );


        if (usuarios.length > 0) {

            return res.status(409).json({

                message: "Esse nome de usuário já está cadastrado."

            });

        }


        // Criar hash da senha

        const senhaHash = await bcrypt.hash(
            senha,
            10
        );


        // Inserir usuário no banco

        const [resultado] = await pool.query(

            `INSERT INTO usuarios (username, senha)
             VALUES (?, ?)`,

            [username, senhaHash]

        );


        // Resposta da API

        res.status(201).json({

            message: "Usuário cadastrado com sucesso!",

            usuario: {

                id: resultado.insertId,

                username: username

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Erro interno do servidor."

        });

    }

});

// ==========================================
// LOGIN
// ==========================================

app.post("/api/login", async (req, res) => {

    try {

        const { username, senha } = req.body;


        // Verificar se os dados foram enviados

        if (!username || !senha) {

            return res.status(400).json({

                message: "Usuário e senha são obrigatórios."

            });

        }


        // Procurar usuário no banco

        const [usuarios] = await pool.query(

            "SELECT * FROM usuarios WHERE username = ?",

            [username]

        );


        // Usuário não encontrado

        if (usuarios.length === 0) {

            return res.status(401).json({

                message: "Usuário ou senha incorretos."

            });

        }


        const usuario = usuarios[0];


        // Comparar senha digitada com o hash

        const senhaCorreta = await bcrypt.compare(

            senha,

            usuario.senha

        );


        // Senha incorreta

        if (!senhaCorreta) {

            return res.status(401).json({

                message: "Usuário ou senha incorretos."

            });

        }


        // Login realizado

const token = jwt.sign(

    {
        id: usuario.id,
        username: usuario.username
    },

    process.env.JWT_SECRET,

    {
        expiresIn: "7d"
    }

);


res.status(200).json({

    message: "Login realizado com sucesso!",

    token: token,

    usuario: {

        id: usuario.id,

        username: usuario.username

    }

});

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Erro interno do servidor."

        });

    }

});

// ==========================================
// SALVAR / ATUALIZAR RECORDE
// ==========================================

app.post(
    "/api/records",
    autenticarToken,
    async (req, res) => {

        try {

            const { jogo, modo, recorde } = req.body;

            const usuarioId = req.usuario.id;


            // Verificar dados

            if (
                !jogo ||
                !modo ||
                recorde === undefined
            ) {

                return res.status(400).json({

                    message: "Jogo, modo e recorde são obrigatórios."

                });

            }


            // Verificar jogo

            if (
                jogo !== "matematica" &&
                jogo !== "portugues"
            ) {

                return res.status(400).json({

                    message: "Jogo inválido."

                });

            }


            // Verificar modo

            if (
                modo !== "tranquilo" &&
                modo !== "velocidade" &&
                modo !== "brutal"
            ) {

                return res.status(400).json({

                    message: "Modo inválido."

                });

            }


            // Verificar recorde

            if (
                typeof recorde !== "number" ||
                recorde < 0
            ) {

                return res.status(400).json({

                    message: "Recorde inválido."

                });

            }


            // Procurar recorde atual

            const [records] = await pool.query(

                `SELECT recorde
                 FROM records
                 WHERE usuario_id = ?
                 AND jogo = ?
                 AND modo = ?`,

                [
                    usuarioId,
                    jogo,
                    modo
                ]

            );


            // Ainda não existe

            if (records.length === 0) {

                await pool.query(

                    `INSERT INTO records
                    (usuario_id, jogo, modo, recorde)
                    VALUES (?, ?, ?, ?)`,

                    [
                        usuarioId,
                        jogo,
                        modo,
                        recorde
                    ]

                );


                return res.status(201).json({

                    message: "Recorde criado com sucesso!",

                    jogo: jogo,

                    modo: modo,

                    recorde: recorde

                });

            }


            const recordeAtual = records[0].recorde;


            // Novo recorde

            if (recorde > recordeAtual) {

                await pool.query(

                    `UPDATE records
                     SET recorde = ?
                     WHERE usuario_id = ?
                     AND jogo = ?
                     AND modo = ?`,

                    [
                        recorde,
                        usuarioId,
                        jogo,
                        modo
                    ]

                );


                return res.json({

                    message: "Novo recorde!",

                    jogo: jogo,

                    modo: modo,

                    recorde: recorde

                });

            }


            // Recorde antigo continua maior

            res.json({

                message: "Recorde anterior continua maior.",

                jogo: jogo,

                modo: modo,

                recorde: recordeAtual

            });

        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                message: "Erro interno do servidor."

            });

        }

    }
);

// ==========================================
// CONSULTAR MEUS RECORDS
// ==========================================

app.get(
    "/api/records/me",
    autenticarToken,
    async (req, res) => {

        try {

            const usuarioId = req.usuario.id;


            const [records] = await pool.query(

                `SELECT jogo, modo, recorde, data_atualizacao
                 FROM records
                 WHERE usuario_id = ?
                 ORDER BY jogo, modo`,

                [usuarioId]

            );


            res.json({

                usuario: req.usuario.username,

                records: records

            });

        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                message: "Erro interno do servidor."

            });

        }

    }
);

// ==========================================
// QUESTÕES DE PORTUGUÊS
// ==========================================

app.get(
    "/api/questoes/portugues",
    async (req, res) => {

        try {

            const [questoes] =
                await pool.query(
                    `SELECT
                        id,
                        nivel,
                        frase,
                        palavra,
                        classe,
                        alternativas,
                        explicacao
                     FROM questoes_portugues
                     ORDER BY nivel, id`
                );


            // Garantir que alternativas seja um array
            const questoesFormatadas =
                questoes.map(
                    questao => {

                        let alternativas =
                            questao.alternativas;


                        if (
                            typeof alternativas ===
                            "string"
                        ) {

                            try {

                                alternativas =
                                    JSON.parse(
                                        alternativas
                                    );

                            }

                            catch (error) {

                                alternativas =
                                    [];

                            }

                        }


                        return {

                            id:
                                questao.id,

                            nivel:
                                questao.nivel,

                            frase:
                                questao.frase,

                            palavra:
                                questao.palavra,

                            classe:
                                questao.classe,

                            alternativas:
                                alternativas,

                            explicacao:
                                questao.explicacao

                        };

                    }
                );


            res.json({

                total:
                    questoesFormatadas.length,

                questoes:
                    questoesFormatadas

            });

        }

        catch (error) {

            console.error(
                "Erro ao buscar questões de Português:",
                error
            );


            res.status(500).json({

                message:
                    "Erro interno do servidor."

            });

        }

    }  
);

// ==========================================
// IMPORTAR QUESTÕES DE PORTUGUÊS
// ROTA TEMPORÁRIA
// ==========================================

app.post(
    "/api/questoes/portugues/importar",
    async (req, res) => {

        try {

            const questoes =
                req.body.questoes;

            if (!Array.isArray(questoes)) {

                return res.status(400).json({
                    message:
                        "Envie um array de questões."
                });

            }

            let inseridas = 0;

            for (const questao of questoes) {

                const {
                    nivel,
                    frase,
                    palavra,
                    classe,
                    alternativas,
                    explicacao
                } = questao;

                if (
                    !nivel ||
                    !frase ||
                    !palavra ||
                    !classe ||
                    !Array.isArray(alternativas) ||
                    !explicacao
                ) {
                    continue;
                }

                await pool.query(
                    `INSERT INTO questoes_portugues
                    (
                        nivel,
                        frase,
                        palavra,
                        classe,
                        alternativas,
                        explicacao
                    )
                    VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        nivel,
                        frase,
                        palavra,
                        classe,
                        JSON.stringify(alternativas),
                        explicacao
                    ]
                );

                inseridas++;

            }

            res.status(201).json({
                message:
                    "Importação concluída.",
                inseridas:
                    inseridas
            });

        }

        catch (error) {

            console.error(
                "Erro ao importar questões:",
                error
            );

            res.status(500).json({
                message:
                    "Erro interno do servidor."
            });

        }

    }
);

// ==========================================
// RANKING
// ==========================================

app.get(
    "/api/ranking/:jogo",
    async (req, res) => {

        try {

            const { jogo } = req.params;


            // Verificar jogo

            if (
                jogo !== "matematica" &&
                jogo !== "portugues"
            ) {

                return res.status(400).json({

                    message: "Jogo inválido."

                });

            }


            const [ranking] = await pool.query(

                `SELECT
                    usuarios.username,
                    records.recorde

                 FROM records

                 INNER JOIN usuarios
                    ON records.usuario_id = usuarios.id

                 WHERE records.jogo = ?
                 AND records.modo = 'brutal'

                 ORDER BY records.recorde DESC

                 LIMIT 100`,

                [jogo]

            );


            res.json({

                jogo: jogo,

                modo: "brutal",

                ranking: ranking

            });

        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                message: "Erro interno do servidor."

            });

        }

    }
);

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(
    PORT,
    () => {

        console.log(
            `Servidor rodando na porta ${PORT}`
        );

    }
);