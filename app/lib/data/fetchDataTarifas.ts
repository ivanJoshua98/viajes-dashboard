import sql from "@/app/lib/data/db";
import { Tarifa, TarifaAdicional } from "@/app/lib/data/definitions";

export async function fetchTarifas () {
  try {
    const tarifas = await sql<Tarifa[]>`
      SELECT tarifas.id, zona AS zona_id, nombre AS zona_nombre, tipo_camion AS tipo_camion_id, monto_centavos, tipo 
      FROM tarifas JOIN tipos_camion 
      ON tipos_camion.id = tarifas.tipo_camion 
      JOIN zonas 
      ON zonas.id = tarifas.zona;
    `;
    return tarifas;
    
  } catch (error) {
    console.log('Database error:', error);
    throw new Error('Error al obtener las tarifas');
  }
}

export async function fetchTarifaById(id: string) {
  try {
    const [ tarifa ] = await sql<Tarifa[]>`
      SELECT tarifas.id, zona AS zona_id, nombre AS zona_nombre, tipo_camion AS tipo_camion_id, monto_centavos, tipo 
      FROM tarifas JOIN tipos_camion 
      ON tipos_camion.id = tarifas.tipo_camion 
      JOIN zonas 
      ON zonas.id = tarifas.zona 
      WHERE tarifas.id = ${id}; 
    `;
    return tarifa;
  } catch (error) {
    console.log('Database error:', error);
    throw new Error('Error al obtener la tarifa');
  }
}

export async function fetchTarifasAdicionales () {
  try {
    const tarifasAdicionales = await sql<TarifaAdicional[]>`
      SELECT id, cantidad, monto_centavos 
      FROM tarifas_adicionales;
    ` 
    return tarifasAdicionales;
  } catch (error) {
    console.log('Database error:', error);
    throw new Error('Error al obtener las tarifas adicionales.')
  }
}

export async function fetchTarifaAdicionalById (id: string) {
  try {
    const [ tarifaAdicional ] = await sql<TarifaAdicional[]>`
      SELECT id, cantidad, monto_centavos 
      FROM tarifas_adicionales 
      WHERE id = ${id};
    ` 
    return tarifaAdicional;
  } catch (error) {
    console.log('Database error:', error);
    throw new Error('Error al obtener la tarifa adicional.')
  }
}