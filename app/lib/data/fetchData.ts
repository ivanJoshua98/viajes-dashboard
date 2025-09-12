import sql from './db';
import { Camion, CamionForm } from './definitions';

export async function fetchCamiones () {
  try {
    const camiones = await sql<Camion[]>`
      SELECT id, patente
      FROM camiones
      ORDER BY patente ASC;
    `;
    return camiones;
  } catch (error) {
    console.log('Database error:', error);
    throw new Error('Error al obtener los camiones');
  }
}

export async function fetchCamionById(id: string) {
  try {
    const camion = await sql<CamionForm[]>`
      SELECT id, patente
      FROM camiones
      WHERE camiones.id = ${id};
    `
    return camion;
  } catch (error) {
    console.log('Database error:', error);
    throw new Error('Error al obtener el camion')
  }
}