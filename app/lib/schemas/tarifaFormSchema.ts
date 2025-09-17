import z from 'zod';

export const TarifaFormSchema = z.object({
  id: z.string(),
  zona:  z.string({
    invalid_type_error: 'Por favor ingrese una zona válida.',
  }),
  tipo: z.string({
    invalid_type_error: 'Por favor ingrese un tipo válido.',
  }),
  monto: z.coerce.number()
    .gt(0, { message: 'Por favor ingrese un monto mayor a cero' }),
});