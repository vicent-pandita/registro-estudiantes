import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from '../estudiantes.service';
import { Estudiante } from '../_estudiante.model';

@Component({
  selector: 'app-form-estudiante',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  id: string | null = null;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private estudiantesService: EstudiantesService
  ) {
    // 🔥 INICIALIZACIÓN CORRECTA DEL FORMULARIO
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [0, Validators.required],
      cursoId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.estudiantesService.obtenerTodos().subscribe(data => {
        const est = data.find(e => e.id === this.id);
        if (est) {
          this.form.patchValue(est);
        }
      });
    }
  }

  guardar() {
    const estudiante: Estudiante = this.form.value as Estudiante;

    if (this.id) {
      this.estudiantesService.actualizar(this.id, estudiante)
        .then(() => this.router.navigate(['/estudiantes']));
    } else {
      this.estudiantesService.crear(estudiante)
        .then(() => this.router.navigate(['/estudiantes']));
    }
  }
}
