import postgres from 'postgres'
import dotenv from 'dotenv';
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

const sql = postgres(
  isProd ? process.env.POSTGRES_URL_PROD! : process.env.POSTGRES_URL_LOCAL!,
  isProd ? { ssl: 'require' } : {}
);

export default sql