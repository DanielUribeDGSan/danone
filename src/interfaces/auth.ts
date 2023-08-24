export interface User {
  name: string;
  apellidos: string;
  edad: number | string;
  email: string;
  institucion: string;
  nacionalidad: string;
  profesional: number;
  especialidad: string;
  area_trabajo: string;
  idioma: number;
  clave: number | string;
  image: string;
  profileImage: string;
  constancia: 0;
}

export interface Lenguage {
  idioma: number;
}

export interface ImageUser {
  image: string;
}

export interface ImageProfile {
  profileImage: string;
}

export interface AuthState {
  user: User | object;
}
