import z from 'zod';

export const CamionFormSchema = z.object({
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
