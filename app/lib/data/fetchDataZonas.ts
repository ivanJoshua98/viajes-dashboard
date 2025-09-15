import sql from "@/app/lib/data/db";
import { Zona } from '@/app/lib/data/definitions';

export async function fetchZonas () {
  try {
    const zonas = await sql<Zona[]>`
      SELECT id, nombre, region
      FROM zonas;  
    `
    return zonas; 
  } catch (error) {
    console.log('Database error:', error);
    throw new Error('Error al obtener las zonas');
  }
}