import z from 'zod';

export const TipoCamionFormSchema = z.object({
  id: z.string(),
  tipo: z.string({
    invalid_type_error: 'Por favor ingrese un tipo válido.',
  }).min(1, { message: 'El tipo es obligatorio.' }),
});
