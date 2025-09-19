import { z } from "zod";

export const ViajeFormSchema = z.object({
  viaje_id: z.string(),
  fecha: z.coerce.date({
    invalid_type_error: 'Por favor ingrese una fecha válida.',
  }),
  zona: z.string({
    invalid_type_error: 'Por favor ingrese una zona válida.',
  }),
  tipo_camion: z.string({
    invalid_type_error: 'Por favor ingrese un tipo válido.',
  }),
  cajones: z.coerce.number().gt(0, {
    message: 'Por favor ingrese una cantidad mayor a cero' 
  }),
  cant_clientes: z.coerce.number().gt(0, {
    message: 'Por favor ingrese una cantidad mayor a cero' 
  }),
  monto: z.coerce.number().gt(0, {
    message: 'Por favor ingrese un monto mayor a cero' 
  }),
  observaciones: z.string().optional(),
  camion: z.string({
    invalid_type_error: 'Por favor ingrese una patente válida.',
  }),
  litros_combustible: z.coerce.number().gt(0, {
    message: 'Por favor ingrese una cantidad mayor a cero' 
  }),
  kilometraje: z.coerce.number().gt(0, {
    message: 'Por favor ingrese un kilometraje mayor a cero' 
  }),
})