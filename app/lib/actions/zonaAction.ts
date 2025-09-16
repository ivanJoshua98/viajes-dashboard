'use server';

import { ZonaFormSchema } from "@/app/lib/schemas/zonaFormSchema";
import sql from "@/app/lib/data/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type StateZonaForm = {
  errors? : {
    nombre? : string[];
    region? : string[]; 
  };
  message? : string | null;
}

/*--------------------------------CREATE--------------------------------------------------*/

const CreateZona = ZonaFormSchema.omit({ id: true });

export async function createZona (prevState: StateZonaForm, formData: FormData) {
  
  const validatedFields = CreateZona.safeParse({
    nombre: formData.get('nombre'),
    region: formData.get('region'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan completar campos. No se pudo agregar la zona.'
    }
  }

  const { nombre, region } = validatedFields.data;

  try {
    await sql`
      INSERT INTO zonas (nombre, region) 
      VALUES (${nombre}, ${region});
    `
  } catch (error) {
    return {
       message: 'Database Error: No se pudo agregar la zona.',
    };
  }

  revalidatePath('/dashboard/zonas');
  redirect('/dashboard/zonas')
};


/*--------------------------------UPDATE--------------------------------------------------*/

const UpdateZona = ZonaFormSchema.omit({ id: true });

export async function updateZona(id: string, prevState: StateZonaForm, formData: FormData) {

  const validatedFields = UpdateZona.safeParse({
    nombre: formData.get('nombre'),
    region: formData.get('region'),
  });

  if (!validatedFields.success) {
    return {  
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan completar campos. No se pudo editar la zona.',
    }
  }

  const { nombre, region } = validatedFields.data;
 
  try {
    await sql`
      UPDATE zonas 
      SET nombre = ${nombre}, region = ${region} 
      WHERE id = ${id};
    `;
  } catch (error) {
    return {
      message: 'Database Error: Fallo al actualizar la zona.',
    };
  }
  revalidatePath('/dashboard/zonas');
  redirect('/dashboard/zonas');
}