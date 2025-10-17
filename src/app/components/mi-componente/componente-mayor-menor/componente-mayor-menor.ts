import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componente-mayor-menor',
  imports: [ CommonModule ],
  templateUrl: './componente-mayor-menor.html',
  styleUrl: './componente-mayor-menor.css'
})
export class ComponenteMayorMenor {

  valores = ['2','3','4','5','6','7','8','9','0','J','Q','K','A'];
  palos = ['hearts', 'spades', 'clubs', 'diamonds'];

  mazo: any[] = [];
  cartaActual: any = null;
  cartaNueva: any = null;
  puntos = 0;
  vidas = 3;
  mensaje = '';
  jugando = false;

  iniciarJuego() {
    this.puntos = 0;
    this.vidas = 3;
    this.jugando = true;
    this.mensaje = '';
    this.crearMazo();
    this.barajarMazo();
    this.cartaActual = this.mazo.pop();
  }

  crearMazo() {
    this.mazo = [];
    for (let palo of this.palos) {
      for (let valor of this.valores) {
        this.mazo.push({ valor, palo });
      }
    }
  }

  barajarMazo() {
    for (let i = this.mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.mazo[i], this.mazo[j]] = [this.mazo[j], this.mazo[i]];
    }
  }

  valorNumerico(valor: string): number {
    const map: any = { 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
    return map[valor] || parseInt(valor);
  }

  jugar(eleccion: 'mayor' | 'menor') {
    if (!this.jugando) return;

    if (this.mazo.length === 0) {
      this.mensaje = 'No quedan más cartas en el mazo.';
      this.finalizarJuego();
      return;
    }

    this.cartaNueva = this.mazo.pop();

    const valorActual = this.valorNumerico(this.cartaActual.valor);
    const valorNueva = this.valorNumerico(this.cartaNueva.valor);

    if (
      (eleccion === 'mayor' && valorNueva > valorActual) ||
      (eleccion === 'menor' && valorNueva < valorActual)
    ) {
      this.puntos++;
      this.mensaje = 'Adivinaste!';
    } else if (valorNueva === valorActual) {
      this.mensaje = 'Empate.';
    } else {
      this.vidas--;
      this.mensaje = 'Fallaste.';
      if (this.vidas <= 0) {
        this.finalizarJuego();
        return;
      }
    }

    this.cartaActual = this.cartaNueva;
  }

  finalizarJuego() {
    this.jugando = false;
    this.mensaje = `Juego terminado. Puntos: ${this.puntos}`;
  }
}

