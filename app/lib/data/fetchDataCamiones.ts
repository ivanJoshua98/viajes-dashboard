import sql from "@/app/lib/data/db";
import { Camion, CamionForm, TipoCamion } from '@/app/lib/data/definitions';

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

export async function fetchTiposCamion () {
  try {
    const tipos = sql<TipoCamion[]>`
    SELECT id, tipo 
    FROM tipos_camion
    ORDER BY tipo ASC;
    `;
    return tipos;
  } catch (error) {
    console.log('Database error:', error);
    throw new Error('Error al obtener los tipos de camion');
  }
}