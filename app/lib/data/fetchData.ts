import sql from './db';
import { Camion } from './definitions';

export async function fetchCamiones () {
  try {
    const camiones = await sql<Camion[]>`
      SELECT id, patente
      FROM camiones
      ORDER BY patente ASC
    `;
    return camiones;
  } catch (error) {
    console.log('Database error:', error);
    throw new Error('Error al obtener los camiones');
  }
}