-- ======================================================
-- 003 — Partidas: integridade do ranking
-- ======================================================
--
-- Ate aqui o placar era enviado pronto pelo navegador:
-- POST /api/records aceitava qualquer inteiro. Bastava
-- abrir o DevTools para ficar em primeiro lugar sem jogar.
--
-- Agora o servidor cria a partida, guarda como ela foi
-- montada e recalcula o placar a partir das respostas
-- enviadas no encerramento.
--
-- O desenho e economico de proposito: o projeto roda em
-- planos gratuitos. Sao apenas duas requisicoes por
-- partida (inicio e fim), e nao uma por questao.
--
-- Nao guardamos as respostas certas:
--   * Matematica: guarda-se a semente, e a sequencia e
--     regerada no encerramento.
--   * Portugues: guardam-se os ids das questoes, e a
--     classe correta vem da propria tabela de questoes.
--
-- E idempotente: nao faz nada se a tabela ja existir.
-- ======================================================

CREATE TABLE IF NOT EXISTS `partidas` (

    `id`            CHAR(36)    NOT NULL,

    `usuario_id`    INT         NOT NULL,

    -- 'matematica' ou 'portugues'
    `jogo`          VARCHAR(50) NOT NULL,

    -- 'tranquilo', 'velocidade' ou 'brutal'
    `modo`          VARCHAR(50) NOT NULL,

    -- Matematica: operacao escolhida, ou NULL no modo
    -- sobrevivencia, em que cada questao sorteia a sua.
    `operacao`      VARCHAR(20) DEFAULT NULL,

    `sobrevivencia` TINYINT(1)  NOT NULL DEFAULT 0,

    -- Matematica: semente do gerador deterministico.
    `semente`       INT UNSIGNED DEFAULT NULL,

    -- Portugues: ids das questoes, na ordem enviada.
    `questoes`      JSON        DEFAULT NULL,

    `iniciada_em`   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,

    `encerrada_em`  DATETIME    DEFAULT NULL,

    -- Placar calculado pelo servidor, nunca o do cliente.
    `acertos`       INT         DEFAULT NULL,

    PRIMARY KEY (`id`),

    -- A limpeza e o encerramento buscam por usuario.
    KEY `idx_partidas_usuario` (`usuario_id`, `iniciada_em`),

    CONSTRAINT `fk_partidas_usuario`
        FOREIGN KEY (`usuario_id`)
        REFERENCES `usuarios` (`id`)
        ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
