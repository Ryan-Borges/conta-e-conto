-- ======================================================
-- 002 — Índice para as consultas de ranking
-- ======================================================
--
-- A tabela records só tinha índices por (id) e por
-- (usuario_id, jogo, modo). Como usuario_id é a primeira
-- coluna da chave única, ela NÃO ajuda consultas que
-- filtram apenas por jogo e modo — que são justamente as
-- duas mais caras da aplicação:
--
--   1) GET /api/ranking/:jogo
--      WHERE jogo = ? AND modo = 'brutal'
--      ORDER BY recorde DESC
--
--   2) GET /api/perfil/rankings
--      subconsulta correlacionada que faz, por linha:
--      COUNT(*) WHERE jogo = ? AND modo = 'brutal'
--               AND recorde > ?
--
--      Sem índice, cada linha do resultado varre a tabela
--      inteira. É o caso que mais degrada conforme o
--      ranking cresce.
--
-- No tamanho atual do banco a diferença é imperceptível.
-- O índice é barato e evita o problema aparecer depois.
--
-- Índice descendente exige MySQL 8+ (o banco usa
-- utf8mb4_0900_ai_ci, então é 8.x).
--
-- É idempotente: não faz nada se o índice já existir.
-- ======================================================

SET @existe := (
    SELECT COUNT(*)
      FROM information_schema.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME   = 'records'
       AND INDEX_NAME   = 'idx_records_ranking'
);

SET @sql := IF(
    @existe = 0,
    'CREATE INDEX idx_records_ranking
         ON records (jogo, modo, recorde DESC)',
    'DO 0'
);

PREPARE aplicar FROM @sql;
EXECUTE aplicar;
DEALLOCATE PREPARE aplicar;
