export interface Comuna {
  id: number;
  nombre: string;
}

export interface Provincia {
  id: number;
  nombre: string;
  comunas: Comuna[];
}

export interface Region {
  id: number;
  nombre: string;
  provincias: Provincia[];
}
