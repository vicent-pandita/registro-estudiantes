import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './guards/role.guard';   // ⭐ IMPORTANTE
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'estudiantes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./estudiantes/estudiantes.module').then(m => m.EstudiantesModule)
  },

  // ⭐ AGREGAMOS EL ROLE GUARD PARA CURSOS
  {
    path: 'cursos',
    canActivate: [AuthGuard],  // ← RoleGuard removed
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
