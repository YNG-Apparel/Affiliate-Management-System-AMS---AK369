/**
 * Fail fast on startup if required environment variables are missing or malformed,
 * with a clear message instead of a confusing runtime crash later.
 */
export function validateEnv(config: Record<string, unknown>): Record<string, unknown> {
  const databaseUrl = config.DATABASE_URL;

  if (typeof databaseUrl !== 'string' || databaseUrl.length === 0) {
    throw new Error('DATABASE_URL is not set. Copy apps/api/.env.example to apps/api/.env and fill it in.');
  }

  if (databaseUrl.includes('USER:PASSWORD') || databaseUrl.includes('HOST/DBNAME')) {
    throw new Error(
      'DATABASE_URL still contains placeholder values. Paste your real Neon connection string into apps/api/.env.',
    );
  }

  const jwtSecret = config.JWT_SECRET;
  if (typeof jwtSecret !== 'string' || jwtSecret.length < 16) {
    throw new Error('JWT_SECRET is missing or too short (min 16 chars). Set it in apps/api/.env.');
  }

  return config;
}
