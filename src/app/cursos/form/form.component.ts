import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso.model';


@Component({
  selector: 'app-form-curso',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  id: string | null = null;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {
    // 🔥 INICIALIZAMOS EL FORMULARIO EN EL CONSTRUCTOR
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.cursosService.obtenerTodos().subscribe(lista => {
        const curso = lista.find(c => c.id === this.id);
        if (curso) this.form.patchValue(curso);
      });
    }
  }

  guardar() {
    const curso: Curso = this.form.value as Curso;

    if (this.id) {
      this.cursosService.actualizar(this.id, curso)
        .then(() => this.router.navigate(['/cursos']));
    } else {
      this.cursosService.crear(curso)
        .then(() => this.router.navigate(['/cursos']));
    }
  }
}
