export interface Estudiante {
  id?: string;
  nombre: string;
  apellido: string;
  edad: number;
  dni: string;      // 👈 Nuevo
  grado: string;    // 👈 Nuevo
  curso: string;    // 👈 Nuevo
  codigo?: string;
}
