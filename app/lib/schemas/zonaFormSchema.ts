import z from "zod";

export const ZonaFormSchema = z.object({
  id: z.string(),
  nombre: z.string({
            invalid_type_error: 'Por favor ingrese un nombre válido.',
          })
          .min(1, {
            message: 'El nombre es muy corto.'
          })
          .max(64, {
            message: 'El nombre es muy largo.'
          }),
  region: z.string({
            invalid_type_error: 'Por favor ingrese una región válida.',
          })
          .min(1, {
            message: 'La región es muy corta.'
          })
          .max(64, {
            message: 'La región es muy larga.'
          }),
})
