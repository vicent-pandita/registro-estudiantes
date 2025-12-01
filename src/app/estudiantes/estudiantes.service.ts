import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Estudiante } from './_estudiante.model';



import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private col: any;

  constructor(private firestore: Firestore) {
    this.col = collection(this.firestore, 'estudiantes');
  }

  obtenerTodos(): Observable<Estudiante[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Estudiante[]>;
  }

  crear(estudiante: Estudiante) {
    // Generar código automático si no existe
    if (!estudiante.codigo) {
      estudiante.codigo = this.generarCodigo(estudiante.nombre, estudiante.apellido);
    }
    return addDoc(this.col, estudiante);
  }

  private generarCodigo(nombre: string, apellido: string): string {
    const n = nombre.charAt(0).toUpperCase();
    const a = apellido.charAt(0).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000); // 4 dígitos aleatorios
    return `${n}${a}${random}`;
  }

  actualizar(id: string, estudiante: Estudiante) {
    const ref = doc(this.firestore, `estudiantes/${id}`);
    return updateDoc(ref, { ...estudiante });
  }

  eliminar(id: string) {
    const ref = doc(this.firestore, `estudiantes/${id}`);
    return deleteDoc(ref);
  }
}
