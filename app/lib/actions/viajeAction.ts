'use server';

import { revalidatePath } from "next/cache";
import sql from "@/app/lib/data/db";
import { ViajeFormSchema } from "@/app/lib/schemas/viajeFormSchema";
import { success } from "zod/v4";

export type StateViajeForm = {
  errors? : {
    fecha?: string[];
    zona?: string[];
    tipo_camion?: string[];
    cajones?: string[];
    cant_clientes?: string[];
    monto?: string[];
    observaciones?: string[];
    camion?: string[];
    litros_combustible?: string[];
    kilometraje?: string[];
  };
  message? : string | null;
  success?: boolean | null;
};

/*--------------------------------CREATE--------------------------------------------------*/

const CreateViaje = ViajeFormSchema.omit({ viaje_id: true });

export async function createViaje (prevState: StateViajeForm, formData: FormData) {
  const validatedFields = CreateViaje.safeParse({
    fecha: formData.get('fecha'),
    zona: formData.get('zona'),
    tipo_camion: formData.get('tipo'),
    cajones: formData.get('cajones'),
    cant_clientes: formData.get('cant-clientes'),
    monto: formData.get('monto'),
    observaciones: formData.get('observaciones'),
    camion: formData.get('camion'),
    litros_combustible: formData.get('litros'),
    kilometraje: formData.get('km'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan completar campos. No se pudo agrear el viaje'
    }
  }

  const {
    fecha,
    zona,
    tipo_camion,
    cajones,
    cant_clientes,
    monto,
    observaciones,
    camion,
    litros_combustible,
    kilometraje,
  } = validatedFields.data;

  try {
    const result = await sql`
      SELECT * FROM viajes
      WHERE fecha = ${fecha} AND 
      fecha = ${fecha} AND
      tipo_camion = ${tipo_camion} AND
      camion = ${camion};
    `;
    if (result.length > 0) {
      return {
        message: 'Ya existe un viaje con la fecha, la zona, el tipo de camión y la patente asociadas'
      };
    }
  } catch (error) {
    console.log('Database error:', error);
    return  {
      message: 'Database error: No se pudo agregar el viaje.'
    };
  }

  try {
    await sql`
      INSERT INTO viajes (
        fecha,
        zona,
        tipo_camion,
        cajones,
        cant_clientes,
        valor_flete_centavos,
        observaciones,
        camion,
        litros_combustible,
        kilometraje
      ) VALUES (
        ${fecha},
        ${zona},
        ${tipo_camion}, 
        ${cajones},
        ${cant_clientes},
        ${monto * 100},
        ${observaciones || ''},
        ${camion},
        ${litros_combustible},
        ${kilometraje}
       );
    `;
  } catch (error) {
    console.log('Database error:', error);
    return {
      message: 'Database error: No se pudo agregar el viaje.'
    };
  }

  revalidatePath('/dashboard/viajes');
  return {
    message: 'Viaje agregado exitosamente.',
    success: true
  };
}