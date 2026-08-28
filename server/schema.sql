-- ======================================================
-- CONTA & CONTO
-- ESTRUTURA DO BANCO DE DADOS (MySQL 8+)
-- ======================================================
--
-- Este arquivo reflete a estrutura real do banco em
-- produção. Ao alterar uma tabela, crie uma migração em
-- server/migrations e atualize este arquivo.
--
-- Para criar o banco do zero:
--     mysql -h HOST -P PORTA -u USUARIO -p NOME_DO_BANCO < server/schema.sql
--
-- Para atualizar um banco que já existe:
--     npm run migrate
--
-- Para conferir se este arquivo bate com o banco real:
--     node schema-dump.js
--
-- As questões de Português precisam ser carregadas à
-- parte (ver docs/portugues.json).
-- ======================================================


-- ======================================================
-- USUÁRIOS
-- ======================================================

CREATE TABLE IF NOT EXISTS `usuarios` (

    `id`                INT           NOT NULL AUTO_INCREMENT,

    -- Validado no servidor: 3 a 50 caracteres.
    `username`          VARCHAR(50)   NOT NULL,

    -- Opcional. Guardado sempre em minúsculas.
    `email`             VARCHAR(150)  DEFAULT NULL,

    -- Hash bcrypt (60 caracteres). VARCHAR(255) dá folga
    -- para uma eventual troca de algoritmo.
    `senha`             VARCHAR(255)  NOT NULL,

    -- Momento da última troca de senha. Tokens JWT
    -- emitidos antes desta data são recusados.
    -- Ver migrations/001_senha_alterada_em.sql
    `senha_alterada_em` DATETIME      DEFAULT NULL,

    `data_cadastro`     TIMESTAMP     NULL DEFAULT CURRENT_TIMESTAMP,

    -- Referencia os arquivos em /avatars.
    -- Ao adicionar avatares, atualize o CHECK abaixo,
    -- TOTAL_AVATARES em server/server.js e em js/script.js.
    `avatar_id`         TINYINT UNSIGNED NOT NULL DEFAULT '1',

    PRIMARY KEY (`id`),

    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `uq_usuarios_email` (`email`),

    CONSTRAINT `chk_avatar_id`
        CHECK ((`avatar_id` BETWEEN 1 AND 12))

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ======================================================
-- RECORDES
-- ======================================================

CREATE TABLE IF NOT EXISTS `records` (

    `id`               INT NOT NULL AUTO_INCREMENT,

    `usuario_id`       INT NOT NULL,

    -- Validados na aplicação: 'matematica' | 'portugues'
    -- e 'tranquilo' | 'velocidade' | 'brutal'.
    `jogo`             VARCHAR(50) NOT NULL,
    `modo`             VARCHAR(50) NOT NULL,

    `recorde`          INT NOT NULL DEFAULT '0',

    `data_atualizacao` TIMESTAMP NULL
                           DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),

    -- Um recorde por usuário/jogo/modo. O servidor faz
    -- SELECT e depois INSERT ou UPDATE; sem esta chave,
    -- duas requisições simultâneas criariam duas linhas.
    UNIQUE KEY `unique_record` (`usuario_id`, `jogo`, `modo`),

    -- Atende à ordenação do ranking e ao cálculo de
    -- posição em /api/perfil/rankings.
    -- Ver migrations/002_indice_ranking.sql
    KEY `idx_records_ranking` (`jogo`, `modo`, `recorde` DESC),

    CONSTRAINT `fk_records_usuario`
        FOREIGN KEY (`usuario_id`)
        REFERENCES `usuarios` (`id`)
        ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ======================================================
-- QUESTÕES DE PORTUGUÊS
-- ======================================================

CREATE TABLE IF NOT EXISTS `questoes_portugues` (

    `id`            INT NOT NULL AUTO_INCREMENT,

    `nivel`         INT          NOT NULL,

    `frase`         TEXT         NOT NULL,

    -- Palavra da frase que será destacada e analisada.
    `palavra`       VARCHAR(100) NOT NULL,

    -- Classe gramatical correta.
    `classe`        VARCHAR(100) NOT NULL,

    -- Array JSON de strings com as alternativas.
    `alternativas`  JSON         NOT NULL,

    `explicacao`    TEXT         NOT NULL,

    `data_cadastro` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ======================================================
-- RECUPERAÇÃO DE SENHA
-- ======================================================

CREATE TABLE IF NOT EXISTS `recuperacao_senha` (

    `id`            INT NOT NULL AUTO_INCREMENT,

    `usuario_id`    INT NOT NULL,

    -- SHA-256 em hexadecimal do token enviado por e-mail.
    -- O token em si nunca é gravado.
    `token_hash`    CHAR(64)  NOT NULL,

    `expira_em`     DATETIME  NOT NULL,

    `usado`         TINYINT(1) NOT NULL DEFAULT '0',

    `data_criacao`  TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),

    UNIQUE KEY `token_hash` (`token_hash`),

    KEY `idx_recuperacao_usuario` (`usuario_id`),
    KEY `idx_recuperacao_expira`  (`expira_em`),

    CONSTRAINT `fk_recuperacao_usuario`
        FOREIGN KEY (`usuario_id`)
        REFERENCES `usuarios` (`id`)
        ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ======================================================
-- CONTROLE DE MIGRAÇÕES
-- ======================================================
--
-- Criada automaticamente por migrate.js. Registra quais
-- arquivos de server/migrations já foram aplicados.

CREATE TABLE IF NOT EXISTS `migracoes` (

    `nome`        VARCHAR(255) NOT NULL,

    `aplicada_em` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`nome`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ======================================================
-- PARTIDAS
-- ======================================================
--
-- O placar não vem do navegador. O servidor cria a
-- partida, guarda como ela foi montada e recalcula o
-- resultado a partir das respostas enviadas.
--
-- Não guardamos as respostas certas:
--   * Matemática: guarda-se a semente, e a sequência é
--     regerada no encerramento.
--   * Português: guardam-se os ids das questões, e a
--     classe correta vem da tabela de questões.
--
-- Ver migrations/003_partidas.sql

CREATE TABLE IF NOT EXISTS `partidas` (

    `id`            CHAR(36)    NOT NULL,

    `usuario_id`    INT         NOT NULL,

    -- 'matematica' ou 'portugues'
    `jogo`          VARCHAR(50) NOT NULL,

    -- 'tranquilo', 'velocidade' ou 'brutal'
    `modo`          VARCHAR(50) NOT NULL,

    -- Matemática: sempre NULL hoje, porque só a
    -- Sobrevivência vale recorde e ela sorteia a operação
    -- de cada questão.
    `operacao`      VARCHAR(20) DEFAULT NULL,

    `sobrevivencia` TINYINT(1)  NOT NULL DEFAULT 0,

    -- Matemática: semente do gerador determinístico.
    `semente`       INT UNSIGNED DEFAULT NULL,

    -- Português: ids das questões, na ordem enviada.
    `questoes`      JSON        DEFAULT NULL,

    `iniciada_em`   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,

    `encerrada_em`  DATETIME    DEFAULT NULL,

    -- Placar calculado pelo servidor, nunca o do cliente.
    `acertos`       INT         DEFAULT NULL,

    PRIMARY KEY (`id`),

    KEY `idx_partidas_usuario` (`usuario_id`, `iniciada_em`),

    CONSTRAINT `fk_partidas_usuario`
        FOREIGN KEY (`usuario_id`)
        REFERENCES `usuarios` (`id`)
        ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
