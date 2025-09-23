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