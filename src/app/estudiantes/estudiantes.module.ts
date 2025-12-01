import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module'; // ← AQUI

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';
import { EstudianteModalComponent } from './modal/estudiante-modal.component'; // 👈 Importar

@NgModule({
  declarations: [
    ListaComponent,
    FormComponent,
    EstudianteModalComponent // 👈 Declarar
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EstudiantesRoutingModule,
    SharedModule // ← IMPORTANTE
  ]
})
export class EstudiantesModule { }
