import { Component, OnInit, ViewChild } from '@angular/core';
import { EstudiantesService } from '../estudiantes.service';
import { Estudiante } from '../_estudiante.model';
import { Router } from '@angular/router';
import { EstudianteModalComponent } from '../modal/estudiante-modal.component';

@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'] // 👈 Agregar estilos
})
export class ListaComponent implements OnInit {

  @ViewChild(EstudianteModalComponent) modal!: EstudianteModalComponent;
  estudiantes: Estudiante[] = [];
  filtro = '';

  constructor(
    private estudiantesService: EstudiantesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.estudiantesService.obtenerTodos().subscribe(data => {
      this.estudiantes = data;
    });
  }

  filtrar() {
    const term = this.filtro.toLowerCase();
    return this.estudiantes.filter(e =>
      e.nombre.toLowerCase().includes(term) ||
      e.apellido.toLowerCase().includes(term) ||
      (e.codigo && e.codigo.toLowerCase().includes(term)) ||
      (e.dni && e.dni.includes(term))
    );
  }

  descargar() {
    const data = this.filtrar(); // Descargar solo lo filtrado
    if (data.length === 0) return;

    const headers = ['Código', 'DNI', 'Nombre', 'Apellido', 'Edad', 'Grado', 'Curso'];
    const rows = data.map(e => [
      e.codigo || '',
      e.dni || '',
      e.nombre,
      e.apellido,
      e.edad,
      e.grado,
      e.curso
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'estudiantes.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  abrirModal() {
    this.modal.abrir();
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
