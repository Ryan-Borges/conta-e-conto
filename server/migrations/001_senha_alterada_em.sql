-- ======================================================
-- 001 — Invalidar tokens após troca de senha
-- ======================================================
--
-- Os tokens JWT valem 7 dias e não eram invalidados na
-- redefinição de senha: quem tivesse acesso à conta
-- continuava dentro mesmo depois de a vítima trocar
-- a senha.
--
-- Registra o momento da troca. O autenticarToken recusa
-- tokens cujo "iat" seja anterior a esta data.
--
-- Aplicar ANTES de subir o backend desta fase.
--
-- É idempotente: se a coluna já existir (por exemplo num
-- banco criado a partir de schema.sql), não faz nada.
-- O MySQL não tem ADD COLUMN IF NOT EXISTS, daí a
-- consulta ao information_schema.
-- ======================================================

SET @existe := (
    SELECT COUNT(*)
      FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME   = 'usuarios'
       AND COLUMN_NAME  = 'senha_alterada_em'
);

SET @sql := IF(
    @existe = 0,
    'ALTER TABLE usuarios
        ADD COLUMN senha_alterada_em DATETIME DEFAULT NULL
        AFTER senha',
    'DO 0'
);

PREPARE aplicar FROM @sql;
EXECUTE aplicar;
DEALLOCATE PREPARE aplicar;
