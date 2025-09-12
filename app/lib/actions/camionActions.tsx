'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';
import sql from '@/app/lib/data/db';
 
const CamionFormSchema = z.object({
  id: z.string(),
  patente:  z
    .string({
      invalid_type_error: 'Por favor ingrese una patente válida.',
    })
    .min(6, {
      message: 'La patente es muy corta.'
    })
    .max(10, {
      message: 'La patente es muy larga.'
    }),
});

export type StateCamionForm = {
  errors?: {
    patente?: string[];
  };
  message?: string | null;
};
 
/*--------------------------------CREATE--------------------------------------------------*/

 const CreateCamion = CamionFormSchema.omit({ id: true });
  
 export async function createCamion (prevState: StateCamionForm, formData: FormData) {
   const validatedFields = CreateCamion.safeParse({
     patente: formData.get('patente'),
   });
   if (!validatedFields.success) {
     return {
       errors: validatedFields.error.flatten().fieldErrors,
       message: 'Faltan completar campos. No se pudo agregar el camión.',
     }
   }
   const { patente } = validatedFields.data;
 
   try {
     await sql`
       INSERT INTO camiones (patente)
       VALUES (${patente});
     `; 
   } catch (error) {
     return {
       message: 'Database Error: No se pudo agregar el camión.',
     };
   }
   
   revalidatePath('/dashboard/camiones');
   redirect('/dashboard/camiones');
 }


/*--------------------------------UPDATE--------------------------------------------------*/

const UpdateCamion = CamionFormSchema.omit({ id: true });

export async function updateCamion(id: string, prevState: StateCamionForm, formData: FormData) {

  const validatedFields = UpdateCamion.safeParse({
    patente: formData.get('patente'),
  });
  if (!validatedFields.success) {
    return {  
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan completar campos. No se pudo editar el camión.',
    }
  }

  const { patente } = validatedFields.data;
 
  try {
    await sql`
      UPDATE camiones
      SET patente = ${patente}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Fallo al actualizar el camión.',
    };
  }
  revalidatePath('/dashboard/camiones');
  redirect('/dashboard/camiones');
}

/*--------------------------------DELETE--------------------------------------------------*/

export async function deleteCamion(id: string) {
    await sql`DELETE FROM camiones WHERE id = ${id}`;
    revalidatePath('/dashboard/camiones');  
}

