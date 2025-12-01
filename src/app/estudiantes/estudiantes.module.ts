import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module'; // ← AQUI

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
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
    EstudiantesRoutingModule,
    SharedModule // ← IMPORTANTE
  ]
})
export class EstudiantesModule {}
