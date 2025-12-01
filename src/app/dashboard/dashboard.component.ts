import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../estudiantes/estudiantes.service';
import { CursosService } from '../cursos/cursos.service';
import { Estudiante } from '../estudiantes/_estudiante.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalEstudiantes = 0;
  totalCursos = 0;
  promedioEdad = 0;
  gradosUnicos = 0;

  constructor(
    private estudiantesService: EstudiantesService,
    private cursosService: CursosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.estudiantesService.obtenerTodos().subscribe(list => {
      this.totalEstudiantes = list.length;

      // Calcular promedio de edad
      if (list.length > 0) {
        const sumaEdades = list.reduce((sum, e) => sum + e.edad, 0);
        this.promedioEdad = Math.round(sumaEdades / list.length);
      }

      // Contar grados únicos
      const grados = new Set(list.map(e => e.grado));
      this.gradosUnicos = grados.size;
    });

    this.cursosService.obtenerTodos().subscribe(list => {
      this.totalCursos = list.length;
    });
  }

  descargarReporte() {
    // Redirigir a estudiantes para usar la función de descarga
    this.router.navigate(['/estudiantes']);
  }
}
