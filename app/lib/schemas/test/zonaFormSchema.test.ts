import { ZonaFormSchema } from "@/app/lib/schemas/zonaFormSchema";
import z from "zod";

describe('ZonaFormSchema', () => {
  it('valida correctamente una zona con nombre y región válidas', () => {
    const data = { id: '1', nombre: 'Zona test', region: 'Region test' };
    const result = ZonaFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('falla si el nombre es muy corto', () => {
    const data = { id: '1', nombre: '', region: 'Region test' };
    const result = ZonaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.nombre).toContain('El nombre es muy corto.');
  });

  it('falla si el nombre es muy largo', () => {
    const data = { id: '1', nombre: 'DGFSABCDEFGHIJKLSFNSDOIGNSIOGNSIOGNSGINDINGSIGDSIOGSOIDNDSOIGSKDGNSD', region: 'Region test' };
    const result = ZonaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.nombre).toContain('El nombre es muy largo.');
  });

  it('falla si el nombre no es string', () => {
    const data = { id: '1', nombre: 123, region: 'Region test' };
    const result = ZonaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.nombre).toContain('Por favor ingrese un nombre válido.');
  });

  it('falla si la región es muy corta', () => {
    const data = { id: '1', nombre: 'Nombre test', region: '' };
    const result = ZonaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.region).toContain('La región es muy corta.');
  });

  it('falla si la región es muy larga', () => {
    const data = { id: '1', nombre: 'Nombre test', region: 'DGFSABCDEFGHIJKLSFNSDOIGNSIOGNSIOGNSGINDINGSIGDSIOGSOIDNDSOIGSKDGNSD' };
    const result = ZonaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.region).toContain('La región es muy larga.');
  });

  it('falla si la región no es string', () => {
    const data = { id: '1', nombre: '', region: 123 };
    const result = ZonaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.region).toContain('Por favor ingrese una región válida.');
  });

  it('falla si falta el id', () => {
    const invalidData = {
      nombre: 'Nombre test',
      region: 'Region test',
    };
    expect(() => ZonaFormSchema.parse(invalidData)).toThrow(z.ZodError);
  });
});
