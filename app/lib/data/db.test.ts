import postgres from 'postgres';
import sql from '@/app/lib/data/db';

describe('sql constant', () => {
  // Simula una consulta simple para verificar la conexión
  // Requiere que POSTGRES_URL esté correctamente configurada
  it('should connect successfully to the database', async () => {
    const result = await sql`SELECT 1 as value`;
    expect(result[0].value).toBe(1);
  });

  // Simula una conexión fallida usando una URL incorrecta
  it('should throw error on connection failure', async () => {
    const badSql = postgres('postgres://invalid:invalid@localhost:5432/invalid');
    await expect(badSql`SELECT 1`).rejects.toThrow();
  });
});

// Cierra la conexión después de todas las pruebas
afterAll(async () => {
  await sql.end(); 
});