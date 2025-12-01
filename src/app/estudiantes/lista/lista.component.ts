import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../estudiantes.service';
import { Estudiante } from '../_estudiante.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  filtro = '';

  constructor(
    private estudiantesService: EstudiantesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.estudiantesService.obtenerTodos().subscribe(data => {
      this.estudiantes = data;
    });
  }

  filtrar() {
    return this.estudiantes.filter(e =>
      e.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      e.apellido.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  editar(id: string) {
    this.router.navigate(['/estudiantes/editar', id]);
  }

  eliminar(id: string) {
    if (confirm('¿Seguro que quieres eliminar este estudiante?')) {
      this.estudiantesService.eliminar(id);
    }
  }
}
