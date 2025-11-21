import { Routes } from '@angular/router';
import { EstudiantesListComponent } from './pages/estudiantes-list/estudiantes-list.component';
import { DetalleEstudianteComponent } from './pages/detalle-estudiante/detalle-estudiante.component';
import { CursosListComponent } from './pages/cursos-list/cursos-list.component';
import { DetalleCursoComponent } from './pages/detalle-curso/detalle-curso.component';

export const routes: Routes = [
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },

  { path: 'estudiantes', component: EstudiantesListComponent },
  { path: 'estudiantes/:id', component: DetalleEstudianteComponent },

  { path: 'cursos', component: CursosListComponent },
  { path: 'cursos/:id', component: DetalleCursoComponent },

  { path: '**', redirectTo: 'estudiantes' }
];
