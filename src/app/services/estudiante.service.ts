import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Estudiante } from '../app.models/estudiante.model';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  firestore = inject(Firestore);
  col = collection(this.firestore, 'estudiantes');

  getEstudiantes() {
    return collectionData(this.col, { idField: 'id' });
  }

  addEstudiante(est: Estudiante) {
    return addDoc(this.col, est);
  }

  updateEstudiante(id: string, est: Partial<Estudiante>) {
    const ref = doc(this.firestore, 'estudiantes', id);
    return updateDoc(ref, est);
  }

  deleteEstudiante(id: string) {
    const ref = doc(this.firestore, 'estudiantes', id);
    return deleteDoc(ref);
  }
}
