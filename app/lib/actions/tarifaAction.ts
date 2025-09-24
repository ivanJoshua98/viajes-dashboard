'use server';

import { revalidatePath } from "next/cache";
import sql from "@/app/lib/data/db";
import { redirect } from "next/navigation";
import { TarifaFormSchema } from "@/app/lib/schemas/tarifaFormSchema";
import { TarifaAdicionalFormSchema } from "../schemas/tarifaAdicionalFormSchema";

export type StateTarifaForm = {
  errors?: {
    zona?: string[];
    tipo?: string[];
    monto?: string[];
  };
  message?: string | null;
};

export type StateTarifaAdicionalForm = {
  errors?: {
    extra?: string[];
    monto?: string[];
  };
  message?: string | null;
};

/*--------------------------------CREATE--------------------------------------------------*/

const CreateTarifa = TarifaFormSchema.omit({ id: true });
  
export async function createTarifa (prevState: StateTarifaForm, formData: FormData) {
  const validatedFields = CreateTarifa.safeParse({
    zona: formData.get('zona'),
    tipo: formData.get('tipo'),
    monto: formData.get('monto'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan completar campos. No se pudo agregar la tarifa.',
    }
  }

  const { zona, tipo, monto } = validatedFields.data;
  
  try {
    const result = await sql`
      SELECT * FROM tarifas 
      WHERE zona = ${zona} AND tipo_camion = ${tipo};
    `;
    if (result.length > 0) {
      return {
        message: 'Ya existe una tarifa con la zona y el tipo de camión asociado.',
      };
    }
  } catch (error) {
    return {
      message: 'Database Error: No se pudo agregar la tarifa.',
    };
  }

  try {
    await sql`
      INSERT INTO tarifas (zona, tipo_camion, monto_centavos) VALUES 
      (${zona}, ${tipo}, ${monto * 100});
    `; 
  } catch (error) {
    return {
      message: 'Database Error: No se pudo agregar la tarifa.',
    };
  }
   
  revalidatePath('/dashboard/tarifas');
  redirect('/dashboard/tarifas');
 }

 /*--------------------------------UPDATE--------------------------------------------------*/


 const UpdateTarifa = TarifaFormSchema.omit({ id: true , zona: true, tipo: true});
  
export async function updateTarifa (id: string, prevState: StateTarifaForm, formData: FormData) {
  const validatedFields = UpdateTarifa.safeParse({
    monto: formData.get('monto'),
  });

  if (!validatedFields.success) {
    return {
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        zona: undefined,
        tipo: undefined,
      },
      message: 'Faltan completar campos. No se pudo editar la tarifa.',
    }
  }

  const { monto } = validatedFields.data;

  try {
     await sql`
      UPDATE tarifas 
      SET monto_centavos = ${monto * 100}
      WHERE id = ${id};
    `; 
  } catch (error) {
    return {
      message: 'Database Error: No se pudo editar la tarifa.',
    };
  }
   
  revalidatePath('/dashboard/tarifas');
  redirect('/dashboard/tarifas');
 }

 /*--------------------------------CREATE ADICIONAL--------------------------------------------------*/

const CreateTarifaAdicional = TarifaAdicionalFormSchema.omit({ id: true });
  
export async function createTarifaAdicional (prevState: StateTarifaAdicionalForm, formData: FormData) {
  const validatedFields = CreateTarifaAdicional.safeParse({
    extra: formData.get('extra'),
    monto: formData.get('monto'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan completar campos. No se pudo agregar la tarifa.',
    }
  }

  const { extra, monto } = validatedFields.data;
  
  try {
    const result = await sql`
      SELECT * FROM tarifas_adicionales 
      WHERE cantidad = ${extra};
    `;
    if (result.length > 0) {
      return {
        message: 'Ya existe una tarifa adicional con la cantidad extra de clientes asociada.',
      };
    }
  } catch (error) {
    return {
      message: 'Database Error: No se pudo agregar la tarifa.',
    };
  }

  try {
    await sql`
      INSERT INTO tarifas_adicionales (cantidad, monto_centavos) VALUES 
      (${extra}, ${monto * 100});
    `; 
  } catch (error) {
    console.log('Database error:', error);
    return {
      message: 'Database Error: No se pudo agregar la tarifa.',
    };
  }
   
  revalidatePath('/dashboard/tarifas');
  redirect('/dashboard/tarifas');
 }

  /*--------------------------------UPDATE ADICIONAL--------------------------------------------------*/


 const UpdateTarifaAdicional = TarifaAdicionalFormSchema.omit({ id: true , extra: true});
  
export async function updateTarifaAdicional (id: string, prevState: StateTarifaForm, formData: FormData) {
  const validatedFields = UpdateTarifaAdicional.safeParse({
    monto: formData.get('monto'),
  });

  if (!validatedFields.success) {
    return {
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        extra: undefined,
      },
      message: 'Faltan completar campos. No se pudo editar la tarifa adicional.',
    }
  }

  const { monto } = validatedFields.data;

  try {
     await sql`
      UPDATE tarifas_adicionales  
      SET monto_centavos = ${monto * 100}
      WHERE id = ${id};
    `; 
  } catch (error) {
    return {
      message: 'Database Error: No se pudo editar la tarifa adicional.',
    };
  }
   
  revalidatePath('/dashboard/tarifas');
  redirect('/dashboard/tarifas');
 }