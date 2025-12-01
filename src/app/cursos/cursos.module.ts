import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';  // ← AQUI

import { CursosRoutingModule } from './cursos-routing.module';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    ListaComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CursosRoutingModule,
    SharedModule  // ← IMPORTANTE
  ]
})
export class CursosModule {}
