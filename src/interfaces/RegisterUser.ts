export interface RegisterUser {
  nombre: string;
  apellidos: string;
  institucion: string;
  nacionalidad: string;
  edad: number | string;
  email: string;
  password: string;
  profesional: boolean;
  especialidad: string;
  area_trabajo: string;
  asistido: string | string[];
  idioma: number;
}
