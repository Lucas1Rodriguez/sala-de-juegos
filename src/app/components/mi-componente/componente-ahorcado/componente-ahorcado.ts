import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoService } from '../../../services/ahorcado';
//import { ResultadosService } from '../../../services/resultados';

@Component({
  selector: 'app-componente-ahorcado',
  templateUrl: './componente-ahorcado.html',
  styleUrls: ['./componente-ahorcado.css'],
  imports: [CommonModule]
})
export class ComponenteAhorcado implements OnInit {
  palabra: string = '';
  palabraSecreta: string = '';
  letras: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  letrasUsadas: string[] = [];
  intentos: number = 6;
  mensaje: string = '';
  puntaje: number = 0;
  ganado = false;

  constructor( private ahorcadoService: AhorcadoService) {}

  ngOnInit() {
    this.nuevoJuego();
  }

  nuevoJuego() {
    this.ganado = false;
    this.palabraSecreta = this.ahorcadoService.iniciarJuego();
    this.palabra = this.ahorcadoService.getPalabraOculta();
    this.letrasUsadas = [];
    this.intentos = 6;
    this.mensaje = '';
    this.puntaje = 0;
  }

  async elegirLetra(letra: string) {
    if (this.letrasUsadas.includes(letra) || this.intentos <= 0) return;
    this.letrasUsadas.push(letra);

    const resultado = this.ahorcadoService.verificarLetra(letra);

    if (resultado === 'acertada') {
      this.puntaje++;
    } else if (resultado === 'fallo') {
      this.intentos--;
    }

    this.palabra = this.ahorcadoService.getPalabraOculta();

  if (this.ahorcadoService.haGanado()) {
    this.mensaje = '🎉 ¡Ganaste!';
    this.ganado = true;
    return;
  }else if (this.intentos === 0) {
    this.mensaje = `💀 Perdiste. La palabra era: ${this.palabraSecreta}`;
  }
  }
}
