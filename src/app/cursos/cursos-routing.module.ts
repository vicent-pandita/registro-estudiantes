import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';
import { CatalogoComponent } from './catalogo/catalogo.component';

const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'catalogo', component: CatalogoComponent }, // 👈 Nueva ruta
  { path: 'nuevo', component: FormComponent },
  { path: 'editar/:id', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
