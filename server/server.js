const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

require("dotenv").config();

const pool = require("./database");

const app = express();

const PORT =
    process.env.PORT || 3000;


// ==========================================
// CONFIGURAÇÕES
// ==========================================

app.set("trust proxy", 1);
app.disable("x-powered-by");

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

app.use(
    express.json({
        limit: "50kb"
    })
);


// ==========================================
// LIMITADOR SIMPLES DE REQUISIÇÕES
// ==========================================

function criarLimitador({
    janelaMs,
    maximo,
    mensagem
}) {

    const acessos =
        new Map();

    return (req, res, next) => {

        const agora =
            Date.now();

        const chave =
            req.ip || "desconhecido";

        const registro =
            acessos.get(chave);

        if (
            !registro ||
            agora > registro.expiraEm
        ) {

            acessos.set(
                chave,
                {
                    quantidade: 1,
                    expiraEm:
                        agora + janelaMs
                }
            );

            return next();

        }

        registro.quantidade++;

        if (
            registro.quantidade >
            maximo
        ) {

            return res
                .status(429)
                .json({
                    message:
                        mensagem
                });

        }

        next();

    };

}


const limitarLogin =
    criarLimitador({
        janelaMs:
            15 * 60 * 1000,
        maximo: 15,
        mensagem:
            "Muitas tentativas de login. Aguarde alguns minutos e tente novamente."
    });


const limitarCadastro =
    criarLimitador({
        janelaMs:
            60 * 60 * 1000,
        maximo: 10,
        mensagem:
            "Muitas tentativas de cadastro. Tente novamente mais tarde."
    });


const limitarRecuperacao =
    criarLimitador({
        janelaMs:
            15 * 60 * 1000,
        maximo: 5,
        mensagem:
            "Muitas solicitações de recuperação. Aguarde alguns minutos."
    });


const limitarContato =
    criarLimitador({
        janelaMs:
            60 * 60 * 1000,
        maximo: 5,
        mensagem:
            "Muitas mensagens enviadas. Tente novamente mais tarde."
    });


// ==========================================
// VALIDAÇÕES
// ==========================================

function normalizarUsername(
    username
) {

    if (
        typeof username !==
        "string"
    ) {
        return "";
    }

    return username.trim();

}


function usernameValido(
    username
) {

    if (
        username.length < 3 ||
        username.length > 50
    ) {
        return false;
    }

    return /^[\p{L}\p{N}._ -]+$/u
        .test(username);

}


function emailValido(
    email
) {

    if (
        typeof email !==
        "string"
    ) {
        return false;
    }

    if (
        email.length > 150
    ) {
        return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


// Quantidade de avatares disponíveis em /avatars.
// Ao adicionar novos arquivos, atualize também o
// CHECK da coluna avatar_id e a constante do front.
const TOTAL_AVATARES = 12;


function avatarValido(
    valor
) {

    const numero =
        Number(valor);


    return (
        Number.isInteger(
            numero
        ) &&
        numero >= 1 &&
        numero <= TOTAL_AVATARES
    );

}


function escaparHtml(
    valor
) {

    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ==========================================
// ENVIO DE E-MAIL VIA BREVO HTTPS API
// ==========================================

function emailConfigurado() {

    return Boolean(
        process.env.BREVO_API_KEY &&
        process.env.EMAIL_FROM
    );

}


async function enviarEmail({
    para,
    assunto,
    html,
    responderPara = null
}) {

    if (!emailConfigurado()) {

        const error =
            new Error(
                "Serviço de e-mail não configurado."
            );

        error.code =
            "EMAIL_NOT_CONFIGURED";

        throw error;

    }


    const corpo = {

        sender: {
            name:
                "Conta & Conto",

            email:
                process.env.EMAIL_FROM
        },

        to: [
            {
                email: para
            }
        ],

        subject:
            assunto,

        htmlContent:
            html
    };


    if (
        responderPara &&
        emailValido(
            responderPara
        )
    ) {

        corpo.replyTo = {
            email:
                responderPara
        };

    }


    const response =
        await fetch(
            "https://api.brevo.com/v3/smtp/email",
            {
                method:
                    "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "api-key":
                        process.env.BREVO_API_KEY
                },

                body:
                    JSON.stringify(
                        corpo
                    )
            }
        );


    if (!response.ok) {

        const detalhe =
            await response.text();

        console.error(
            "Erro da Brevo:",
            response.status,
            detalhe
        );

        throw new Error(
            "Falha ao enviar e-mail."
        );

    }

}


// ==========================================
// AUTENTICAÇÃO JWT
// ==========================================

function autenticarToken(
    req,
    res,
    next
) {

    const autorizacao =
        req.headers[
            "authorization"
        ];


    if (!autorizacao) {

        return res
            .status(401)
            .json({
                message:
                    "Token não fornecido."
            });

    }


    const partes =
        autorizacao.split(" ");

    const token =
        partes[1];


    if (!token) {

        return res
            .status(401)
            .json({
                message:
                    "Token inválido."
            });

    }


    try {

        const usuario =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        req.usuario =
            usuario;

        next();

    }

    catch (error) {

        return res
            .status(403)
            .json({
                message:
                    "Token inválido ou expirado."
            });

    }

}


function criarTokenUsuario(
    usuario
) {

    return jwt.sign(
        {
            id:
                usuario.id,

            username:
                usuario.username
        },

        process.env.JWT_SECRET,

        {
            expiresIn:
                "7d"
        }
    );

}


// ==========================================
// ROTA INICIAL
// ==========================================

app.get(
    "/",
    (req, res) => {

        res.json({
            message:
                "API Conta & Conto funcionando!"
        });

    }
);


// ==========================================
// PERFIL
// ==========================================

app.get(
    "/api/perfil",
    autenticarToken,
    async (req, res) => {

        try {

            const [usuarios] =
                await pool.query(
                    `SELECT
                        id,
                        username,
                        email,
                        avatar_id,
                        data_cadastro
                     FROM usuarios
                     WHERE id = ?`,
                    [
                        req.usuario.id
                    ]
                );


            if (
                usuarios.length === 0
            ) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Usuário não encontrado."
                    });

            }


            res.json({
                usuario:
                    usuarios[0]
            });

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
                });

        }

    }
);


// ==========================================
// POSIÇÕES DO USUÁRIO NOS RANKINGS
// ==========================================

app.get(
    "/api/perfil/rankings",
    autenticarToken,
    async (req, res) => {

        try {

            const usuarioId =
                req.usuario.id;


            const [records] =
                await pool.query(
                    `SELECT
                        r.jogo,
                        r.recorde,
                        (
                            SELECT
                                COUNT(*) + 1
                            FROM records r2
                            WHERE
                                r2.jogo = r.jogo
                                AND r2.modo = 'brutal'
                                AND r2.recorde > r.recorde
                        ) AS posicao
                     FROM records r
                     WHERE
                        r.usuario_id = ?
                        AND r.modo = 'brutal'
                        AND r.jogo IN (
                            'matematica',
                            'portugues'
                        )`,
                    [
                        usuarioId
                    ]
                );


            const resposta = {
                matematica:
                    null,

                portugues:
                    null
            };


            records.forEach(
                record => {

                    resposta[
                        record.jogo
                    ] = {
                        recorde:
                            Number(
                                record.recorde
                            ),

                        posicao:
                            Number(
                                record.posicao
                            )
                    };

                }
            );


            res.json(
                resposta
            );

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
                });

        }

    }
);


// ==========================================
// ALTERAR NOME DE USUÁRIO
// ==========================================

app.put(
    "/api/perfil/username",
    autenticarToken,
    async (req, res) => {

        try {

            const novoUsername =
                normalizarUsername(
                    req.body.novoUsername
                );

            const confirmacao =
                String(
                    req.body.confirmacao ||
                    ""
                ).trim();

            const senha =
                String(
                    req.body.senha ||
                    ""
                );


            if (
                !novoUsername ||
                !confirmacao ||
                !senha
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Preencha todos os campos."
                    });

            }


            if (
                !usernameValido(
                    novoUsername
                )
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "O novo usuário deve ter entre 3 e 50 caracteres e usar apenas letras, números, espaços, ponto, hífen ou underline."
                    });

            }


            const [usuarios] =
                await pool.query(
                    `SELECT
                        id,
                        username,
                        email,
                        senha
                     FROM usuarios
                     WHERE id = ?`,
                    [
                        req.usuario.id
                    ]
                );


            if (
                usuarios.length === 0
            ) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Usuário não encontrado."
                    });

            }


            const usuario =
                usuarios[0];


            const confirmacaoValida =
                confirmacao
                    .toLowerCase() ===
                    String(
                        usuario.username
                    ).toLowerCase() ||
                (
                    usuario.email &&
                    confirmacao
                        .toLowerCase() ===
                        String(
                            usuario.email
                        ).toLowerCase()
                );


            if (
                !confirmacaoValida
            ) {

                return res
                    .status(401)
                    .json({
                        message:
                            "Usuário ou e-mail de confirmação não corresponde à conta."
                    });

            }


            const senhaCorreta =
                await bcrypt.compare(
                    senha,
                    usuario.senha
                );


            if (
                !senhaCorreta
            ) {

                return res
                    .status(401)
                    .json({
                        message:
                            "Senha atual incorreta."
                    });

            }


            const [existentes] =
                await pool.query(
                    `SELECT id
                     FROM usuarios
                     WHERE username = ?
                     AND id <> ?`,
                    [
                        novoUsername,
                        usuario.id
                    ]
                );


            if (
                existentes.length > 0
            ) {

                return res
                    .status(409)
                    .json({
                        message:
                            "Esse nome de usuário já está em uso."
                    });

            }


            await pool.query(
                `UPDATE usuarios
                 SET username = ?
                 WHERE id = ?`,
                [
                    novoUsername,
                    usuario.id
                ]
            );


            const usuarioAtualizado = {
                id:
                    usuario.id,

                username:
                    novoUsername,

                email:
                    usuario.email
            };


            const token =
                criarTokenUsuario(
                    usuarioAtualizado
                );


            res.json({
                message:
                    "Nome de usuário atualizado com sucesso!",

                token,

                usuario:
                    usuarioAtualizado
            });

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
                });

        }

    }
);


// ==========================================
// ADICIONAR / ALTERAR E-MAIL
// ==========================================

app.put(
    "/api/perfil/email",
    autenticarToken,
    async (req, res) => {

        try {

            const email =
                String(
                    req.body.email ||
                    ""
                )
                    .trim()
                    .toLowerCase();

            const senha =
                String(
                    req.body.senha ||
                    ""
                );


            if (
                !email ||
                !senha
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Informe o e-mail e sua senha atual."
                    });

            }


            if (
                !emailValido(
                    email
                )
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Informe um e-mail válido."
                    });

            }


            const [usuarios] =
                await pool.query(
                    `SELECT
                        id,
                        username,
                        senha
                     FROM usuarios
                     WHERE id = ?`,
                    [
                        req.usuario.id
                    ]
                );


            if (
                usuarios.length === 0
            ) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Usuário não encontrado."
                    });

            }


            const usuario =
                usuarios[0];


            const senhaCorreta =
                await bcrypt.compare(
                    senha,
                    usuario.senha
                );


            if (
                !senhaCorreta
            ) {

                return res
                    .status(401)
                    .json({
                        message:
                            "Senha atual incorreta."
                    });

            }


            const [emailExistente] =
                await pool.query(
                    `SELECT id
                     FROM usuarios
                     WHERE email = ?
                     AND id <> ?`,
                    [
                        email,
                        usuario.id
                    ]
                );


            if (
                emailExistente.length > 0
            ) {

                return res
                    .status(409)
                    .json({
                        message:
                            "Esse e-mail já está vinculado a outra conta."
                    });

            }


            await pool.query(
                `UPDATE usuarios
                 SET email = ?
                 WHERE id = ?`,
                [
                    email,
                    usuario.id
                ]
            );


            res.json({
                message:
                    "E-mail atualizado com sucesso!",

                email
            });

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
                });

        }

    }
);


// ==========================================
// ALTERAR AVATAR
// ==========================================

app.put(
    "/api/perfil/avatar",
    autenticarToken,
    async (req, res) => {

        try {

            const avatarId =
                Number(
                    req.body.avatarId
                );


            if (
                !avatarValido(
                    avatarId
                )
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Avatar inválido."
                    });

            }


            const [resultado] =
                await pool.query(
                    `UPDATE usuarios
                        SET avatar_id = ?
                      WHERE id = ?`,
                    [
                        avatarId,
                        req.usuario.id
                    ]
                );


            if (
                resultado.affectedRows === 0
            ) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Usuário não encontrado."
                    });

            }


            res.json({
                message:
                    "Avatar atualizado com sucesso.",

                avatar_id:
                    avatarId
            });

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
                });

        }

    }
);


// ==========================================
// CADASTRAR USUÁRIO
// ==========================================

app.post(
    "/api/usuarios",
    limitarCadastro,
    async (req, res) => {

        try {

            const username =
                normalizarUsername(
                    req.body.username
                );

            const senha =
                String(
                    req.body.senha ||
                    ""
                );

            const emailRecebido =
                String(
                    req.body.email ||
                    ""
                ).trim();

            const email =
                emailRecebido
                    ? emailRecebido
                        .toLowerCase()
                    : null;


            if (
                !username ||
                !senha
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Usuário e senha são obrigatórios."
                    });

            }


            if (
                !usernameValido(
                    username
                )
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "O usuário deve ter entre 3 e 50 caracteres e usar apenas letras, números, espaços, ponto, hífen ou underline."
                    });

            }


            if (
                senha.length < 6
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "A senha deve ter pelo menos 6 caracteres."
                    });

            }


            if (
                email &&
                !emailValido(
                    email
                )
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Informe um e-mail válido."
                    });

            }


            const [usuarios] =
                await pool.query(
                    `SELECT id
                     FROM usuarios
                     WHERE username = ?
                     OR (
                        ? IS NOT NULL
                        AND email = ?
                     )`,
                    [
                        username,
                        email,
                        email
                    ]
                );


            if (
                usuarios.length > 0
            ) {

                return res
                    .status(409)
                    .json({
                        message:
                            "Esse usuário ou e-mail já está cadastrado."
                    });

            }


            const senhaHash =
                await bcrypt.hash(
                    senha,
                    10
                );


            const [resultado] =
                await pool.query(
                    `INSERT INTO usuarios
                        (username, email, senha)
                     VALUES (?, ?, ?)`,
                    [
                        username,
                        email,
                        senhaHash
                    ]
                );


            res
                .status(201)
                .json({
                    message:
                        "Usuário cadastrado com sucesso!",

                    usuario: {
                        id:
                            resultado.insertId,

                        username,
                        email
                    }
                });

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
                });

        }

    }
);


// ==========================================
// LOGIN
// ==========================================

app.post(
    "/api/login",
    limitarLogin,
    async (req, res) => {

        try {

            const identificador =
                String(
                    req.body.username ||
                    ""
                ).trim();

            const senha =
                String(
                    req.body.senha ||
                    ""
                );


            if (
                !identificador ||
                !senha
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Usuário/e-mail e senha são obrigatórios."
                    });

            }


            const [usuarios] =
                await pool.query(
                    `SELECT *
                     FROM usuarios
                     WHERE username = ?
                     OR email = ?
                     LIMIT 1`,
                    [
                        identificador,
                        identificador
                            .toLowerCase()
                    ]
                );


            if (
                usuarios.length === 0
            ) {

                return res
                    .status(401)
                    .json({
                        message:
                            "Usuário/e-mail ou senha incorretos."
                    });

            }


            const usuario =
                usuarios[0];


            const senhaCorreta =
                await bcrypt.compare(
                    senha,
                    usuario.senha
                );


            if (
                !senhaCorreta
            ) {

                return res
                    .status(401)
                    .json({
                        message:
                            "Usuário/e-mail ou senha incorretos."
                    });

            }


            const token =
                criarTokenUsuario(
                    usuario
                );


            res
                .status(200)
                .json({
                    message:
                        "Login realizado com sucesso!",

                    token,

                    usuario: {
                        id:
                            usuario.id,

                        username:
                            usuario.username,

                        email:
                            usuario.email ||
                            null,

                        avatar_id:
                            avatarValido(
                                usuario.avatar_id
                            )
                                ? Number(
                                    usuario.avatar_id
                                )
                                : 1
                    }
                });

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
                });

        }

    }
);


// ==========================================
// ESQUECI A SENHA
// ==========================================

app.post(
    "/api/senha/esqueci",
    limitarRecuperacao,
    async (req, res) => {

        try {

            if (
                !emailConfigurado()
            ) {

                return res
                    .status(503)
                    .json({
                        message:
                            "A recuperação por e-mail ainda não está configurada."
                    });

            }


            const identificador =
                String(
                    req.body.identificador ||
                    ""
                ).trim();


            if (
                !identificador
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Informe seu usuário ou e-mail."
                    });

            }


            const [usuarios] =
                await pool.query(
                    `SELECT
                        id,
                        username,
                        email
                     FROM usuarios
                     WHERE username = ?
                     OR email = ?
                     LIMIT 1`,
                    [
                        identificador,
                        identificador
                            .toLowerCase()
                    ]
                );


            /*
                A resposta é propositalmente genérica
                para não revelar se uma conta existe.
            */
            const mensagemGenerica =
                "Se a conta possuir um e-mail cadastrado, enviaremos um link de recuperação.";


            if (
                usuarios.length === 0 ||
                !usuarios[0].email
            ) {

                return res.json({
                    message:
                        mensagemGenerica
                });

            }


            const usuario =
                usuarios[0];

            const token =
                crypto
                    .randomBytes(32)
                    .toString("hex");

            const tokenHash =
                crypto
                    .createHash("sha256")
                    .update(token)
                    .digest("hex");

            const minutos =
                Number(
                    process.env
                        .RESET_TOKEN_MINUTES
                ) || 30;

            const expiraEm =
                new Date(
                    Date.now() +
                    minutos *
                    60 *
                    1000
                );


            await pool.query(
                `DELETE FROM recuperacao_senha
                 WHERE usuario_id = ?
                 OR expira_em < NOW()`,
                [
                    usuario.id
                ]
            );


            await pool.query(
                `INSERT INTO recuperacao_senha
                    (
                        usuario_id,
                        token_hash,
                        expira_em
                    )
                 VALUES (?, ?, ?)`,
                [
                    usuario.id,
                    tokenHash,
                    expiraEm
                ]
            );


            const frontendUrl =
                process.env
                    .FRONTEND_URL ||
                "https://conta-e-conto.vercel.app";

            const link =
                `${frontendUrl}/?resetToken=${encodeURIComponent(token)}`;


            await enviarEmail({
                para:
                    usuario.email,

                assunto:
                    "Recuperação de senha — Conta & Conto",

                html:
                    `
                    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033">
                        <h2>Conta & Conto</h2>
                        <p>Olá, ${escaparHtml(usuario.username)}.</p>
                        <p>Recebemos uma solicitação para redefinir sua senha.</p>
                        <p>
                            <a href="${link}"
                               style="display:inline-block;padding:12px 18px;background:#1769d2;color:white;text-decoration:none;border-radius:8px">
                                Redefinir minha senha
                            </a>
                        </p>
                        <p>O link expira em ${minutos} minutos.</p>
                        <p>Se você não pediu a recuperação, ignore esta mensagem.</p>
                    </div>
                    `
            });


            res.json({
                message:
                    mensagemGenerica
            });

        }

        catch (error) {

            console.error(
                "Erro na recuperação:",
                error
            );


            if (
                error.code ===
                "EMAIL_NOT_CONFIGURED"
            ) {

                return res
                    .status(503)
                    .json({
                        message:
                            "A recuperação por e-mail ainda não está configurada."
                    });

            }


            res
                .status(500)
                .json({
                    message:
                        "Não foi possível processar a recuperação agora."
                });

        }

    }
);


// ==========================================
// REDEFINIR SENHA
// ==========================================

app.post(
    "/api/senha/redefinir",
    limitarRecuperacao,
    async (req, res) => {

        try {

            const token =
                String(
                    req.body.token ||
                    ""
                );

            const novaSenha =
                String(
                    req.body.novaSenha ||
                    ""
                );


            if (
                !token ||
                !novaSenha
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Token e nova senha são obrigatórios."
                    });

            }


            if (
                novaSenha.length < 6
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "A nova senha deve ter pelo menos 6 caracteres."
                    });

            }


            const tokenHash =
                crypto
                    .createHash("sha256")
                    .update(token)
                    .digest("hex");


            const [solicitacoes] =
                await pool.query(
                    `SELECT
                        id,
                        usuario_id
                     FROM recuperacao_senha
                     WHERE
                        token_hash = ?
                        AND usado = FALSE
                        AND expira_em > NOW()
                     LIMIT 1`,
                    [
                        tokenHash
                    ]
                );


            if (
                solicitacoes.length === 0
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Este link é inválido ou expirou."
                    });

            }


            const solicitacao =
                solicitacoes[0];


            const senhaHash =
                await bcrypt.hash(
                    novaSenha,
                    10
                );


            const conexao =
                await pool.getConnection();


            try {

                await conexao
                    .beginTransaction();


                await conexao.query(
                    `UPDATE usuarios
                     SET senha = ?
                     WHERE id = ?`,
                    [
                        senhaHash,
                        solicitacao.usuario_id
                    ]
                );


                await conexao.query(
                    `UPDATE recuperacao_senha
                     SET usado = TRUE
                     WHERE id = ?`,
                    [
                        solicitacao.id
                    ]
                );


                await conexao.query(
                    `DELETE FROM recuperacao_senha
                     WHERE
                        usuario_id = ?
                        AND id <> ?`,
                    [
                        solicitacao.usuario_id,
                        solicitacao.id
                    ]
                );


                await conexao
                    .commit();

            }

            catch (error) {

                await conexao
                    .rollback();

                throw error;

            }

            finally {

                conexao.release();

            }


            res.json({
                message:
                    "Senha atualizada com sucesso! Você já pode entrar com a nova senha."
            });

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
                });

        }

    }
);


// ==========================================
// FALE CONOSCO
// ==========================================

app.post(
    "/api/contato",
    autenticarToken,
    limitarContato,
    async (req, res) => {

        try {

            if (
                !emailConfigurado()
            ) {

                return res
                    .status(503)
                    .json({
                        message:
                            "O envio de mensagens ainda não está configurado."
                    });

            }


            const nome =
                String(
                    req.body.nome ||
                    ""
                ).trim();

            const email =
                String(
                    req.body.email ||
                    ""
                )
                    .trim()
                    .toLowerCase();

            const assunto =
                String(
                    req.body.assunto ||
                    ""
                ).trim();

            const mensagem =
                String(
                    req.body.mensagem ||
                    ""
                ).trim();


            if (
                !nome ||
                !email ||
                !assunto ||
                !mensagem
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Preencha todos os campos."
                    });

            }


            if (
                nome.length > 80 ||
                assunto.length > 120 ||
                mensagem.length > 2000
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "A mensagem ultrapassa o limite permitido."
                    });

            }


            if (
                !emailValido(
                    email
                )
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Informe um e-mail válido para resposta."
                    });

            }


            const destinatario =
                process.env
                    .CONTACT_EMAIL ||
                process.env
                    .EMAIL_FROM;


            await enviarEmail({
                para:
                    destinatario,

                responderPara:
                    email,

                assunto:
                    `[Conta & Conto] ${assunto}`,

                html:
                    `
                    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033">
                        <h2>Nova mensagem pelo Conta & Conto</h2>
                        <p><strong>Nome:</strong> ${escaparHtml(nome)}</p>
                        <p><strong>E-mail:</strong> ${escaparHtml(email)}</p>
                        <p><strong>Usuário ID:</strong> ${escaparHtml(req.usuario.id)}</p>
                        <p><strong>Assunto:</strong> ${escaparHtml(assunto)}</p>
                        <hr>
                        <p>${escaparHtml(mensagem).replaceAll("\n", "<br>")}</p>
                    </div>
                    `
            });


            res.json({
                message:
                    "Mensagem enviada com sucesso!"
            });

        }

        catch (error) {

            console.error(
                "Erro ao enviar contato:",
                error
            );


            if (
                error.code ===
                "EMAIL_NOT_CONFIGURED"
            ) {

                return res
                    .status(503)
                    .json({
                        message:
                            "O envio de mensagens ainda não está configurado."
                    });

            }


            res
                .status(500)
                .json({
                    message:
                        "Não foi possível enviar sua mensagem agora."
                });

        }

    }
);


// ==========================================
// SALVAR / ATUALIZAR RECORDE
// ==========================================

app.post(
    "/api/records",
    autenticarToken,
    async (req, res) => {

        try {

            const {
                jogo,
                modo,
                recorde
            } = req.body;

            const usuarioId =
                req.usuario.id;


            if (
                !jogo ||
                !modo ||
                recorde === undefined
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Jogo, modo e recorde são obrigatórios."
                    });

            }


            if (
                jogo !== "matematica" &&
                jogo !== "portugues"
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Jogo inválido."
                    });

            }


            if (
                modo !== "tranquilo" &&
                modo !== "velocidade" &&
                modo !== "brutal"
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Modo inválido."
                    });

            }


            if (
                typeof recorde !==
                    "number" ||
                !Number.isFinite(
                    recorde
                ) ||
                recorde < 0 ||
                !Number.isInteger(
                    recorde
                ) ||
                recorde > 100000
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Recorde inválido."
                    });

            }


            const [records] =
                await pool.query(
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


            if (
                records.length === 0
            ) {

                await pool.query(
                    `INSERT INTO records
                        (
                            usuario_id,
                            jogo,
                            modo,
                            recorde
                        )
                     VALUES (?, ?, ?, ?)`,
                    [
                        usuarioId,
                        jogo,
                        modo,
                        recorde
                    ]
                );


                return res
                    .status(201)
                    .json({
                        message:
                            "Recorde criado com sucesso!",

                        jogo,
                        modo,
                        recorde
                    });

            }


            const recordeAtual =
                Number(
                    records[0]
                        .recorde
                );


            if (
                recorde >
                recordeAtual
            ) {

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
                    message:
                        "Novo recorde!",

                    jogo,
                    modo,
                    recorde
                });

            }


            res.json({
                message:
                    "Recorde anterior continua maior.",

                jogo,
                modo,

                recorde:
                    recordeAtual
            });

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
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

            const usuarioId =
                req.usuario.id;


            const [records] =
                await pool.query(
                    `SELECT
                        jogo,
                        modo,
                        recorde,
                        data_atualizacao
                     FROM records
                     WHERE usuario_id = ?
                     ORDER BY jogo, modo`,
                    [
                        usuarioId
                    ]
                );


            res.json({
                usuario:
                    req.usuario.username,

                records
            });

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
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

                            alternativas,

                            explicacao:
                                questao.explicacao
                        };

                    }
                );


            res.json({
                total:
                    questoesFormatadas
                        .length,

                questoes:
                    questoesFormatadas
            });

        }

        catch (error) {

            console.error(
                "Erro ao buscar questões de Português:",
                error
            );


            res
                .status(500)
                .json({
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

            const {
                jogo
            } = req.params;


            if (
                jogo !== "matematica" &&
                jogo !== "portugues"
            ) {

                return res
                    .status(400)
                    .json({
                        message:
                            "Jogo inválido."
                    });

            }


            const [ranking] =
                await pool.query(
                    `SELECT
                        usuarios.id AS usuario_id,
                        usuarios.username,
                        usuarios.avatar_id,
                        records.recorde
                     FROM records
                     INNER JOIN usuarios
                        ON records.usuario_id =
                           usuarios.id
                     WHERE
                        records.jogo = ?
                        AND records.modo = 'brutal'
                     ORDER BY
                        records.recorde DESC,
                        usuarios.username ASC
                     LIMIT 100`,
                    [
                        jogo
                    ]
                );


            res.json({
                jogo,
                modo:
                    "brutal",

                ranking:
                    ranking.map(
                        (player, index) => ({
                            usuario_id:
                                player.usuario_id,

                            username:
                                player.username,

                            avatar_id:
                                avatarValido(
                                    player.avatar_id
                                )
                                    ? Number(
                                        player.avatar_id
                                    )
                                    : 1,

                            recorde:
                                Number(
                                    player.recorde
                                ),

                            posicao:
                                index + 1
                        })
                    )
            });

        }

        catch (error) {

            console.error(error);

            res
                .status(500)
                .json({
                    message:
                        "Erro interno do servidor."
                });

        }

    }
);


// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Servidor rodando na porta ${PORT}`
        );

    }
);
