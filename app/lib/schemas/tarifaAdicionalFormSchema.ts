import z from 'zod';

export const TarifaAdicionalFormSchema = z.object({
  id: z.string(),
  extra: z.coerce.number()
    .gt(0, { message: 'Por favor ingrese una cantidad mayor a cero' }),
  monto: z.coerce.number()
    .gt(0, { message: 'Por favor ingrese un monto mayor a cero' }),
});
