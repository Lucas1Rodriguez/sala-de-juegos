import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bolita',
  templateUrl: './componente-bolita.html',
  styleUrls: ['./componente-bolita.css'],
  imports: [ CommonModule ],
})
export class ComponenteBolita {
  vidas = 3;
  puntos = 0;
  mensaje = '';
  jugando = false;
  eleccion: number | null = null;
  cartas: any[] = [];
  reyIndex = 0;

  animando = false;
  animaciones: string[] = ['normal', 'normal', 'normal'];
  mostrarCartas = true;

  palos = ['hearts', 'spades', 'clubs', 'diamonds'];
  numeros = ['2','3','4','5','6','7','8','9','0','J','Q', 'A'];

  iniciarJuego() {
    this.jugando = true;
    this.puntos = 0;
    this.vidas = 3;
    this.nuevaRonda();
  }

  async nuevaRonda() {
    this.mensaje = 'Recuerda donde está el Rey👑';
    this.eleccion = null;
    this.animando = true;

    
    const cartasTemp: any[] = [];
    this.reyIndex = Math.floor(Math.random() * 3);

    this.cartas = cartasTemp;
    this.mostrarCartas = true;

    for (let i = 0; i < 3; i++) {
      if (i === this.reyIndex) {
        cartasTemp.push({ nombre: 'K', palo: this.palos[Math.floor(Math.random() * this.palos.length)], esRey: true });
      } else {
        cartasTemp.push({ nombre: this.numeros[Math.floor(Math.random() * this.numeros.length)], palo: this.palos[Math.floor(Math.random() * this.palos.length)], esRey: false });
      }
    }

    setTimeout(() => {
      this.mostrarCartas = false;
      this.mensaje = 'Mezclando las cartas';
      this.animaciones = ['mezclando', 'mezclando', 'mezclando'];

      this.reyIndex = Math.floor(Math.random() * 3);


      setTimeout(() => {
        this.animaciones = ['normal', 'normal', 'normal'];
        this.animando = false;
        this.mensaje = 'Encuentra al Rey👑';
      }, 1000);
    }, 1000);
  }

  elegirCarta(index: number) {
    if (this.animando || this.eleccion !== null) return;
    this.eleccion = index;
    this.mostrarCartas = true;

    if (this.cartas[index].esRey) {
      this.puntos++;
      this.mensaje = 'Felicidades! Encontraste al Rey👑';
    } else {
      this.vidas--;
      this.mensaje = 'Fallaste. Esa carta no era el Rey';
    }

    if (this.vidas === 0) {
      this.finalizarJuego();
    } else {
      setTimeout(() => this.nuevaRonda(), 1500);
    }
  }

  finalizarJuego() {
    this.jugando = false;
    this.mensaje = `Fin del juego. Puntos: ${this.puntos}`;
  }

  getImagenCarta(carta: any): string {
    if (!carta) return '';

    console.log(this.cartas,carta);

    let valor = carta.valor === '10' ? '0' : carta.valor;

    let paloLetra = '';
    switch (carta.palo) {
      case 'hearts':
        paloLetra = 'H';
        break;
      case 'spades':
        paloLetra = 'S';
        break;
      case 'clubs':
        paloLetra = 'C';
        break;
      case 'diamonds':
        paloLetra = 'D';
        break;
      default:
        paloLetra = 'H';
    }
    const url = `https://deckofcardsapi.com/static/img/${valor}${paloLetra}.png`;

    console.log('URL carta:', url);

    return url;
  }

  getOffset() {
    return Math.random() * 100 - 50;
  }
}