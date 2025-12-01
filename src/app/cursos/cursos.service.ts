import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Curso } from './curso.model';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private col: any;

  constructor(private firestore: Firestore) {
    this.col = collection(this.firestore, 'cursos'); // INICIALIZADO CORRECTAMENTE
  }

  obtenerTodos(): Observable<Curso[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Curso[]>;
  }

  crear(curso: Curso) {
    return addDoc(this.col, curso);
  }

  actualizar(id: string, curso: Curso) {
    const ref = doc(this.firestore, `cursos/${id}`);
    return updateDoc(ref, { ...curso });
  }

  eliminar(id: string) {
    const ref = doc(this.firestore, `cursos/${id}`);
    return deleteDoc(ref);
  }
}
