import { Component } from '@angular/core';
import { ResultadosService } from '../../../services/resultados';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-componente-resultados-juegos',
  imports: [CommonModule],
  templateUrl: './componente-resultados-juegos.html',
  styleUrl: './componente-resultados-juegos.css'
})
export class ComponenteResultadosJuegos {


  resultados: any[] = [];
  juegos = ['Ahorcado', 'Mayor o Menor', 'Bolita', 'Preguntados'];
  juegoSeleccionado = '';

  constructor(private resultadosService: ResultadosService) {}

  async ngOnInit() {
    await this.cargarResultados();
  }

  async cargarResultados() {
    try {
      this.resultados = await this.resultadosService.obtenerResultados(this.juegoSeleccionado || undefined);
    } catch (err) {
      console.error('Error al cargar resultados:', err);
    }
  }

  async filtrarPorJuego(juego: string) {
    this.juegoSeleccionado = juego;
    await this.cargarResultados();
  }

  onJuegoChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.juegoSeleccionado = select.value;
    this.cargarResultados();
  }

  ordenarPorPuntaje() {
    this.resultados.sort((a, b) => b.puntaje - a.puntaje);
  }

}
