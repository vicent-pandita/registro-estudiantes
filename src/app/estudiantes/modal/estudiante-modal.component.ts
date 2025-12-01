import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiantesService } from '../estudiantes.service';
import { CursosService } from '../../cursos/cursos.service';
import { Estudiante } from '../_estudiante.model';

@Component({
    selector: 'app-estudiante-modal',
    templateUrl: './estudiante-modal.component.html',
    styleUrls: ['./estudiante-modal.component.scss']
})
export class EstudianteModalComponent implements OnInit {

    @Output() cerrado = new EventEmitter<void>();
    form: FormGroup;
    isVisible = false;
    cursos: any[] = []; // Lista de cursos disponibles
    cursosFiltrados: string[] = []; // Cursos filtrados según el grado

    // Cursos predefinidos del sistema educativo peruano
    cursosPrimaria = [
        'Matemáticas',
        'Ciencia y tecnología',
        'Comunicación (Castellano)',
        'Arte y cultura',
        'Educación física',
        'Inglés como lengua extranjera',
        'Educación religiosa'
    ];

    cursosSecundaria = [
        'Matemáticas',
        'Comunicación',
        'Ciencia y tecnología',
        'Ciencias sociales',
        'Educación física',
        'Arte y cultura',
        'Inglés',
        'Educación para el trabajo (EPT)',
        'Formación ciudadana y cívica',
        'Persona, familia y relaciones humanas',
        'Educación religiosa',
        'Tutoría y orientación educativa'
    ];

    constructor(
        private fb: FormBuilder,
        private estudiantesService: EstudiantesService,
        private cursosService: CursosService
    ) {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            dni: ['', [Validators.required, Validators.minLength(8)]],
            edad: [0, [Validators.required, Validators.min(1)]],
            grado: ['', Validators.required],
            curso: ['', Validators.required]
        });
    }

    ngOnInit() {
        // Escuchar cambios en el campo "grado" para filtrar cursos
        this.form.get('grado')?.valueChanges.subscribe(grado => {
            this.filtrarCursosPorGrado(grado);
        });
    }

    filtrarCursosPorGrado(grado: string) {
        const gradoLower = grado.toLowerCase();

        // Detectar si es primaria o secundaria
        if (gradoLower.includes('primaria') || gradoLower.includes('1ro') ||
            gradoLower.includes('2do') || gradoLower.includes('3ro') ||
            gradoLower.includes('4to') || gradoLower.includes('5to') ||
            gradoLower.includes('6to')) {
            this.cursosFiltrados = this.cursosPrimaria;
        } else if (gradoLower.includes('secundaria') || gradoLower.includes('1ero') ||
            gradoLower.includes('2ndo') || gradoLower.includes('3ero') ||
            gradoLower.includes('4to') || gradoLower.includes('5to')) {
            this.cursosFiltrados = this.cursosSecundaria;
        } else {
            // Si no se puede determinar, mostrar todos
            this.cursosFiltrados = [...this.cursosPrimaria, ...this.cursosSecundaria];
        }
    }

    abrir() {
        this.isVisible = true;
        this.form.reset({ edad: 0 });
    }

    cerrar() {
        this.isVisible = false;
        this.cerrado.emit();
    }

    guardar() {
        if (this.form.invalid) return;

        const estudiante: Estudiante = this.form.value;

        this.estudiantesService.crear(estudiante)
            .then(() => {
                alert('Estudiante registrado con éxito');
                this.cerrar();
            })
            .catch(err => console.error(err));
    }
}
