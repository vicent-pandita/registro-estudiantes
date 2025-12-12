import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  cursos: Curso[] = [];
  filtro = '';

  constructor(
    private cursosService: CursosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cursosService.obtenerTodos().subscribe(data => {
      this.cursos = data;
    });
  }

  filtrar() {
    const term = this.filtro.toLowerCase();

    return this.cursos.filter(c =>
      (c.nombre || '').toLowerCase().includes(term)
    );
  }


  editar(id: string) {
    this.router.navigate(['/cursos/editar', id]);
  }

  eliminar(id: string) {
    if (confirm('¿Eliminar este curso?')) {
      this.cursosService.eliminar(id);
    }
  }
}
