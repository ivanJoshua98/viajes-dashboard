import { TipoCamionFormSchema } from '@/app/lib/schemas/tipoCamionFormSchema'
import { z } from 'zod';

describe('TipoCamionFormSchema', () => {
  it('valida correctamente un tipo de camion válido', () => {
    const validData = {
      id: '1',
      tipo: 'Remolque',
    };
    expect(() => TipoCamionFormSchema.parse(validData)).not.toThrow();
  });

  it('falla si falta el campo "tipo"', () => {
    const invalidData = {
      id: '1',
      tipo: '',
    };
    expect(() => TipoCamionFormSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  it('falla si el tipo no es string', () => {
    const invalidData = {
      id: '1',
      tipo: 123,
    };
    expect(() => TipoCamionFormSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  it('falla si falta el id', () => {
    const invalidData = {
      tipo: 'Camioneta',
    };
    expect(() => TipoCamionFormSchema.parse(invalidData)).toThrow(z.ZodError);
  });
});
