import sql from "@/app/lib/data/db";
import { Viaje } from "@/app/lib/data/definitions";

export async function fetchViajes () {

  try {
    const viajes = await sql<Viaje[]>`
    SELECT viajes.id AS viaje_id, 
           fecha, 
           zona AS zona_id, 
           zonas.nombre AS zona_nombre, 
           tipo_camion AS tipo_id, 
           tipos_camion.tipo AS tipo_camion_nombre, 
           cajones, 
           cant_clientes, 
           valor_flete_centavos, 
           observaciones, 
           camion AS camion_id, 
           camiones.patente AS camion_patente, 
           litros_combustible, 
           kilometraje 
    FROM viajes 
    JOIN zonas ON viajes.zona = zonas.id 
    JOIN tipos_camion ON viajes.tipo_camion = tipos_camion.id 
    JOIN camiones ON viajes.camion = camiones.id;
  `;
  return viajes;
  } catch (error) {
    console.log('Database Error:', error);
    throw new Error('Error al obtener los viajes');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredViajes (query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const viajes = await sql<Viaje[]>`
    SELECT viajes.id AS viaje_id, 
           fecha, 
           zona AS zona_id, 
           zonas.nombre AS zona_nombre, 
           tipo_camion AS tipo_id, 
           tipos_camion.tipo AS tipo_camion_nombre, 
           cajones, 
           cant_clientes, 
           valor_flete_centavos, 
           observaciones, 
           camion AS camion_id, 
           camiones.patente AS camion_patente, 
           litros_combustible, 
           kilometraje 
    FROM viajes 
    JOIN zonas ON viajes.zona = zonas.id 
    JOIN tipos_camion ON viajes.tipo_camion = tipos_camion.id 
    JOIN camiones ON viajes.camion = camiones.id 
    WHERE 
      viajes.fecha::text ILIKE ${`%${query}%`} OR 
      zonas.nombre ILIKE ${`%${query}%`} OR 
      tipos_camion.tipo ILIKE ${`%${query}%`} OR 
      valor_flete_centavos::text ILIKE ${`%${query}%`} OR 
      observaciones ILIKE ${`%${query}%`} OR 
      camiones.patente ILIKE ${`%${query}%`}  
    ORDER BY viajes.fecha DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
  `;
  return viajes;
  } catch (error) {
    console.log('Database Error:', error);
    throw new Error('Error al obtener los viajes');
  }
}

// Obtener la cantidad de resultados para paginar
export async function fetchViajesPages(query: string) {
try {
    const data = await sql`
    SELECT COUNT(*)
    FROM viajes 
    JOIN zonas ON viajes.zona = zonas.id 
    JOIN tipos_camion ON viajes.tipo_camion = tipos_camion.id 
    JOIN camiones ON viajes.camion = camiones.id
    WHERE 
      viajes.fecha::text ILIKE ${`%${query}%`} OR 
      zonas.nombre ILIKE ${`%${query}%`} OR 
      tipos_camion.tipo ILIKE ${`%${query}%`} OR 
      valor_flete_centavos::text ILIKE ${`%${query}%`} OR 
      observaciones ILIKE ${`%${query}%`} OR 
      camiones.patente ILIKE ${`%${query}%`};
  `;
  const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
  return totalPages;
  } catch (error) {
    console.log('Database Error:', error);
    throw new Error('Error al obtener la cantidad de viajes');
  }
}

export async function fetchViajeById (id: string) {
  try {
    const [ viaje ] = await sql<Viaje[]>`
      SELECT viajes.id AS viaje_id, 
             fecha, 
             zona AS zona_id, 
             zonas.nombre AS zona_nombre, 
             tipo_camion AS tipo_id, 
             tipos_camion.tipo AS tipo_camion_nombre, 
             cajones, 
             cant_clientes, 
             valor_flete_centavos, 
             observaciones, 
             camion AS camion_id, 
             camiones.patente AS camion_patente, 
             litros_combustible, 
             kilometraje 
      FROM viajes 
      JOIN zonas ON viajes.zona = zonas.id 
      JOIN tipos_camion ON viajes.tipo_camion = tipos_camion.id 
      JOIN camiones ON viajes.camion = camiones.id 
      WHERE viajes.id = ${id};
    `;  
    return viaje;
    } catch (error) {
    console.log('Database error:', error);
    throw new Error('Error al obtener el viaje.');
  }
}