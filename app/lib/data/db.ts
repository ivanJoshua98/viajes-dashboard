import postgres from 'postgres'
import dotenv from 'dotenv';
dotenv.config();

/* Cuando se despliegue la aplicacion
const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
}) */

const sql = postgres(process.env.POSTGRES_URL!);

export default sql