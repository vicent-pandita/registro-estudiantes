import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizarPipe } from './pipes/capitalizar.pipe';
import { ResaltarDirective } from './directivas/resaltar.directive';

@NgModule({
  declarations: [
    CapitalizarPipe,
    ResaltarDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CapitalizarPipe,
    ResaltarDirective
  ]
})
export class SharedModule {}
