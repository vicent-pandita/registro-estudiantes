import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../estudiantes/estudiantes.service';
import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  totalEstudiantes = 0;
  totalCursos = 0;

  constructor(
    private estudiantesService: EstudiantesService,
    private cursosService: CursosService
  ) {}

  ngOnInit() {
    this.estudiantesService.obtenerTodos().subscribe(list => {
      this.totalEstudiantes = list.length;
    });

    this.cursosService.obtenerTodos().subscribe(list => {
      this.totalCursos = list.length;
    });
  }
}
