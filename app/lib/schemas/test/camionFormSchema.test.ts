import { CamionFormSchema } from "@/app/lib/schemas/camionFormSchema";
import z from "zod";

describe('CamionFormSchema', () => {
  it('valida correctamente una patente válida', () => {
    const data = { id: '1', patente: 'ABC1234' };
    const result = CamionFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('falla si la patente es muy corta', () => {
    const data = { id: '1', patente: 'ABC' };
    const result = CamionFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.patente).toContain('La patente es muy corta.');
  });

  it('falla si la patente es muy larga', () => {
    const data = { id: '1', patente: 'ABCDEFGHIJKL' };
    const result = CamionFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.patente).toContain('La patente es muy larga.');
  });

  it('falla si la patente no es string', () => {
    const data = { id: '1', patente: 1234567 };
    const result = CamionFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.patente).toContain('Por favor ingrese una patente válida.');
  });

  it('falla si falta el id', () => {
    const invalidData = { patente: 'ABC1234' };
    expect(() => CamionFormSchema.parse(invalidData)).toThrow(z.ZodError);
  });
});
