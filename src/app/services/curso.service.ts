import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Curso } from '../app.models/curso.model';

@Injectable({ providedIn: 'root' })
export class CursoService {
  firestore = inject(Firestore);
  col = collection(this.firestore, 'cursos');

  getCursos() {
    return collectionData(this.col, { idField: 'id' });
  }

  addCurso(curso: Curso) {
    return addDoc(this.col, curso);
  }

  updateCurso(id: string, curso: Partial<Curso>) {
    const ref = doc(this.firestore, 'cursos', id);
    return updateDoc(ref, curso);
  }

  deleteCurso(id: string) {
    const ref = doc(this.firestore, 'cursos', id);
    return deleteDoc(ref);
  }
}
