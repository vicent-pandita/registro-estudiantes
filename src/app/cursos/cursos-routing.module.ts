import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'nuevo', component: FormComponent },
  { path: 'editar/:id', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule {}
