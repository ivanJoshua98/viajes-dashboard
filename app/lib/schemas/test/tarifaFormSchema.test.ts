import { TarifaFormSchema } from "../tarifaFormSchema";

describe('TarifaFormSchema', () => {

  it('valida correctamente una tarifa con zona, tipo y monto valido', () => {
    const data = { id: '1', zona: 'zona-id', tipo: 'tipo-id', monto: 1000 };
    const result = TarifaFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('falla si no tiene id', () => {
    const data = { zona: 'zona-id', tipo: 'tipo-id', monto: 1000 };
    const result = TarifaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.id?.flat()).toContain('Required');
  });

  it('falla si la zona no es un string', () => {
    const data = { id: 'abc', zona: 1234 as any, tipo: 'tipo-id', monto: 1000 };
    const result = TarifaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.zona).toContain('Por favor ingrese una zona válida.');
  });

  it('falla si el tipo no es un string', () => {
    const data = { id: 'abc', zona: 'zona-id', tipo: 1234 as any, monto: 1000 };
    const result = TarifaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.tipo).toContain('Por favor ingrese un tipo válido.');
  });

  it('valida correctamente si el monto es un numero en formato string', () => {
    const data = { id: 'abc', zona: 'zona-id', tipo: 'tipo-id', monto: '1000' };
    const result = TarifaFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('falla si el monto no se traduce a un numero', () => {
    const data = { id: 'abc', zona: 'zona-id', tipo: 'tipo-id', monto: 'abc' };
    const result = TarifaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.monto?.flat()).toContain('Expected number, received nan');
  });

  it('falla si el monto es menor a cero', () => {
    const data = { id: 'abc', zona: 1234 as any, tipo: 'tipo-id', monto: -1 };
    const result = TarifaFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.monto).toContain('Por favor ingrese un monto mayor a cero');
  });
});