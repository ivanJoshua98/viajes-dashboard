'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';
import sql from '@/app/lib/data/db';

const TipoCamionFormSchema = z.object({
  id: z.string(),
  tipo: z.string({
    invalid_type_error: 'Por favor ingrese un tipo válido.',
  }).min(1, { message: 'El tipo es obligatorio.' }),
});

export type StateTipoCamionForm = {
  errors?: {
    tipo?: string[];
  };
  message?: string | null;
};
 
/*--------------------------------CREATE--------------------------------------------------*/

 const CreateTipoCamion = TipoCamionFormSchema.omit({ id: true });
  
 export async function createTipoCamion (prevState: StateTipoCamionForm, formData: FormData) {
   const validatedFields = CreateTipoCamion.safeParse({
     tipo: formData.get('tipo'),
   });
   if (!validatedFields.success) {
     return {
       errors: validatedFields.error.flatten().fieldErrors,
       message: 'Faltan completar campos. No se pudo crear el tipo.',
     }
   }
   const { tipo } = validatedFields.data;
 
   try {
     await sql`
       INSERT INTO tipos_camion (tipo)
       VALUES (${tipo});
     `; 
   } catch (error) {
     return {
       message: 'Database Error: No se pudo crear el tipo.',
     };
   }
   
   revalidatePath('/dashboard/camiones');
   redirect('/dashboard/camiones');
 }