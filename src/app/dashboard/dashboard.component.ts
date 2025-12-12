import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { EstudiantesService } from '../estudiantes/estudiantes.service';
import { CursosService } from '../cursos/cursos.service';
import { Estudiante } from '../estudiantes/_estudiante.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    // Animación para modales - fade in/out con scale
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ]),

    // Animación para backdrop del modal
    trigger('backdropAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ]),

    // Animación para cards estadísticas - entrada escalonada
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ], { params: { delay: 0 } })
    ]),

    // Animación para items de lista - entrada escalonada
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ]),

    // Animación para botones de acción
    trigger('buttonAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms {{delay}}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ opacity: 1, transform: 'scale(1)' }))
      ], { params: { delay: 0 } })
    ])
  ]
})
export class DashboardComponent implements OnInit {
  // Propiedades para estadísticas
  totalEstudiantes: number = 0;
  totalCursos: number = 0;
  promedioEdad: number = 0;
  gradosUnicos: number = 0;

  // Propiedades para modales
  mostrarModalGrados: boolean = false;
  mostrarModalEdad: boolean = false;
  mostrarModalEstudiantes: boolean = false;
  mostrarModalCursos: boolean = false;

  // Propiedades para distribución de grados
  distribucionGrados: Array<{
    grado: string;
    cantidad: number;
    porcentaje: number;
  }> = [];

  // Propiedades para edad por nivel
  totalEstudiantesPrimaria: number = 0;
  totalEstudiantesSecundaria: number = 0;
  promedioEdadPrimaria: number = 0;
  promedioEdadSecundaria: number = 0;

  // Catálogo oficial de cursos
  cursosPrimaria: string[] = [
    'Matemática',
    'Comunicación',
    'Personal Social',
    'Ciencia y Ambiente',
    'Arte y Cultura',
    'Educación Física',
    'Inglés como lengua extranjera',
    'Educación Religiosa',
    'Desarrollo Personal, Ciudadanía y Cívica',
    'Ciencias Sociales',
    'Educación para el Trabajo'
  ];

  cursosSecundaria: string[] = [
    'Matemática',
    'Comunicación (Lengua y Literatura)',
    'Inglés (Lengua Extranjera)',
    'Arte y Cultura',
    'Ciencias Sociales (Historia, Geografía)',
    'Desarrollo Personal, Ciudadanía y Cívica (DPC)',
    'Educación Física',
    'Educación Religiosa',
    'Ciencia y Tecnología (incluye Biología, Física, Química)',
    'Educación para el Trabajo (EPT)'
  ];

  constructor(
    private estudiantesService: EstudiantesService,
    private cursosService: CursosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.estudiantesService.obtenerTodos().subscribe(list => {
      this.totalEstudiantes = list.length;

      // Calcular promedio de edad (evitando NaN)
      const estudiantesConEdad = list.filter(e => e.edad && !isNaN(Number(e.edad)));

      if (estudiantesConEdad.length > 0) {
        const sumaEdades = estudiantesConEdad.reduce((sum, e) => sum + Number(e.edad), 0);
        this.promedioEdad = Math.round(sumaEdades / estudiantesConEdad.length);
      } else {
        this.promedioEdad = 0;
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
    const primariaConEdad = estudiantesPrimaria.filter(e => e.edad && !isNaN(Number(e.edad)));

    if (primariaConEdad.length > 0) {
      const sumaPrimaria = primariaConEdad.reduce((sum, e) => sum + Number(e.edad), 0);
      this.promedioEdadPrimaria = Math.round(sumaPrimaria / primariaConEdad.length);
    } else {
      this.promedioEdadPrimaria = 0;
    }

    // Calcular promedio de secundaria
    this.totalEstudiantesSecundaria = estudiantesSecundaria.length;
    const secundariaConEdad = estudiantesSecundaria.filter(e => e.edad && !isNaN(Number(e.edad)));

    if (secundariaConEdad.length > 0) {
      const sumaSecundaria = secundariaConEdad.reduce((sum, e) => sum + Number(e.edad), 0);
      this.promedioEdadSecundaria = Math.round(sumaSecundaria / secundariaConEdad.length);
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

  abrirModalCursos() {
    this.mostrarModalCursos = true;
  }

  cerrarModalCursos() {
    this.mostrarModalCursos = false;
  }
}
