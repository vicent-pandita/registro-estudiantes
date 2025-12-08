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

  // Modal de cursos oficiales
  mostrarModalCursos = false;

  // Modal de grados activos
  mostrarModalGrados = false;
  distribucionGrados: { grado: string, cantidad: number, porcentaje: number }[] = [];

  // Modal de edad promedio
  mostrarModalEdad = false;
  promedioEdadPrimaria = 0;
  promedioEdadSecundaria = 0;
  totalEstudiantesPrimaria = 0;
  totalEstudiantesSecundaria = 0;

  // Modal de distribución de estudiantes
  mostrarModalEstudiantes = false;

  cursosOficiales = {
    primaria: [
      'Matemática',
      'Comunicación',
      'Personal Social',
      'Ciencia y Tecnología',
      'Arte y Cultura',
      'Educación Física',
      'Educación Religiosa',
      'Inglés'
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
      'Educación para el Trabajo'
    ]
  };

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

      // Contar grados únicos y calcular distribución
      const grados = new Set(list.map(e => e.grado));
      this.gradosUnicos = grados.size;

      // Calcular distribución de estudiantes por grado
      this.calcularDistribucionGrados(list);

      // Calcular promedios de edad por nivel educativo
      this.calcularPromediosEdadPorNivel(list);
    });

    this.cursosService.obtenerTodos().subscribe(list => {
      this.totalCursos = list.length;
    });
  }

  calcularDistribucionGrados(estudiantes: Estudiante[]) {
    // Contar estudiantes por grado
    const conteo: { [grado: string]: number } = {};

    estudiantes.forEach(e => {
      if (conteo[e.grado]) {
        conteo[e.grado]++;
      } else {
        conteo[e.grado] = 1;
      }
    });

    // Convertir a array y calcular porcentajes
    this.distribucionGrados = Object.keys(conteo)
      .map(grado => ({
        grado: grado,
        cantidad: conteo[grado],
        porcentaje: Math.round((conteo[grado] / estudiantes.length) * 100)
      }))
      .sort((a, b) => {
        // Ordenar por grado (1ro, 2do, 3ro, etc.)
        const ordenPrimaria = ['1ro Primaria', '2do Primaria', '3ro Primaria', '4to Primaria', '5to Primaria', '6to Primaria'];
        const ordenSecundaria = ['1ro Secundaria', '2do Secundaria', '3ro Secundaria', '4to Secundaria', '5to Secundaria'];

        const indexA = [...ordenPrimaria, ...ordenSecundaria].indexOf(a.grado);
        const indexB = [...ordenPrimaria, ...ordenSecundaria].indexOf(b.grado);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        return a.grado.localeCompare(b.grado);
      });
  }

  abrirModalCursos() {
    this.mostrarModalCursos = true;
  }

  cerrarModalCursos() {
    this.mostrarModalCursos = false;
  }

  abrirModalGrados() {
    this.mostrarModalGrados = true;
  }

  cerrarModalGrados() {
    this.mostrarModalGrados = false;
  }

  calcularPromediosEdadPorNivel(estudiantes: Estudiante[]) {
    // Filtrar estudiantes de primaria (grados que contienen "Primaria")
    const estudiantesPrimaria = estudiantes.filter(e =>
      e.grado && e.grado.toLowerCase().includes('primaria')
    );

    // Filtrar estudiantes de secundaria (grados que contienen "Secundaria")
    const estudiantesSecundaria = estudiantes.filter(e =>
      e.grado && e.grado.toLowerCase().includes('secundaria')
    );

    // Calcular promedio de primaria
    this.totalEstudiantesPrimaria = estudiantesPrimaria.length;
    if (estudiantesPrimaria.length > 0) {
      const sumaPrimaria = estudiantesPrimaria.reduce((sum, e) => sum + e.edad, 0);
      this.promedioEdadPrimaria = Math.round(sumaPrimaria / estudiantesPrimaria.length);
    } else {
      this.promedioEdadPrimaria = 0;
    }

    // Calcular promedio de secundaria
    this.totalEstudiantesSecundaria = estudiantesSecundaria.length;
    if (estudiantesSecundaria.length > 0) {
      const sumaSecundaria = estudiantesSecundaria.reduce((sum, e) => sum + e.edad, 0);
      this.promedioEdadSecundaria = Math.round(sumaSecundaria / estudiantesSecundaria.length);
    } else {
      this.promedioEdadSecundaria = 0;
    }
  }

  abrirModalEdad() {
    this.mostrarModalEdad = true;
  }

  cerrarModalEdad() {
    this.mostrarModalEdad = false;
  }

  abrirModalEstudiantes() {
    this.mostrarModalEstudiantes = true;
  }

  cerrarModalEstudiantes() {
    this.mostrarModalEstudiantes = false;
  }

  descargarReporte() {
    // Redirigir a estudiantes para usar la función de descarga
    this.router.navigate(['/estudiantes']);
  }
}
