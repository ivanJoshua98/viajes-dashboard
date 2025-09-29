
export type Camion = {
  id: string;
  patente: string;
};

// Futuramente actualizable
export type CamionForm = {
  id: string;
  patente: string;
};

export type TipoCamion = {
  id: string;
  tipo: string;
};

export type Zona = {
  id: string;
  nombre: string;
  region: string;
};

export type Tarifa = {
  id: string;
  zona_id: string;
  tipo_camion_id: string;
  monto_centavos: number;
  tipo: string;
  zona_nombre: string;
};

export type Viaje = {
  viaje_id: string;
  fecha: Date;
  zona_id: string;
  zona_nombre: string;
  tipo_id: string;
  tipo_camion_nombre: string;
  cajones: number;
  cant_clientes: number;
  valor_flete_centavos: number;
  observaciones: string;
  camion_id: string;
  camion_patente: string;
  litros_combustible: number;
  kilometraje: number;
}

export type TarifaAdicional = {
  id: string;
  cantidad: number;
  monto_centavos: number;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};