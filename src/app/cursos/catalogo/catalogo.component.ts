import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  nivelActivo: 'primaria' | 'secundaria' = 'primaria';

  cursosOficiales = {
    primaria: [
      'Matemática',
      'Comunicación (Castellano, Lenguas Originarias)',
      'Ciencia y Tecnología',
      'Personal Social',
      'Arte y Cultura',
      'Educación Física',
      'Educación Religiosa',
      'Tutoría y Orientación Educativa',
      'Inglés como Lengua Extranjera'
    ],
    secundaria: [
      'Matemática',
      'Comunicación',
      'Inglés',
      'Arte y Cultura',
      'Ciencias Sociales',
      'Desarrollo Personal, Ciudadanía y Cívica',
      'Educación Física',
      'Educación Religiosa',
      'Ciencia y Tecnología',
      'Educación para el Trabajo (EPT)',
      'Tutoría y Orientación Educativa'
    ]
  };
}
