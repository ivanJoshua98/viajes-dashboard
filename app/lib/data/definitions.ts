
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