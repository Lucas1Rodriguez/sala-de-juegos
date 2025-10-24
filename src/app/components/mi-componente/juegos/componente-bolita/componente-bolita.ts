import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosService } from '../../../../services/resultados';
import { Supabase } from '../../../../services/supabase';

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
  usuario: any = null;
  nombreUsuario: string | null = null;
  animando = false;
  animaciones: string[] = ['normal', 'normal', 'normal'];
  mostrarCartas = true;

  palos = ['hearts', 'spades', 'clubs', 'diamonds'];
  numeros = ['2','3','4','5','6','7','8','9','0','J','Q', 'A'];

  constructor(private resultadosService: ResultadosService, private supabaseService: Supabase){}

  async ngOnInit(){
    const sesion = await this.supabaseService.getSession();
    if (sesion?.user) {
      this.usuario = sesion.user;
    }
    const perfil = await this.supabaseService.obtenerPerfil(this.usuario.id);
      if (perfil) {
        this.nombreUsuario = perfil;
      }
  }

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

    
    for (let i = 0; i < 3; i++) {
      if (i === this.reyIndex) {
        cartasTemp.push({ nombre: 'K', palo: this.palos[Math.floor(Math.random() * this.palos.length)], esRey: true });
      } else {
        cartasTemp.push({ nombre: this.numeros[Math.floor(Math.random() * this.numeros.length)], palo: this.palos[Math.floor(Math.random() * this.palos.length)], esRey: false });
      }
    }
    
    this.cartas = cartasTemp;
    this.mostrarCartas = true;

    setTimeout(() => {
      this.mostrarCartas = false;
      this.mensaje = 'Mezclando las cartas';
      this.animaciones = ['mezclando', 'mezclando', 'mezclando'];

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

  async finalizarJuego() {
    this.jugando = false;
    this.mensaje = `Fin del juego. Puntos: ${this.puntos}`;
    await this.resultadosService.guardarResultados(this.nombreUsuario, 'Bolita', this.puntos);
  }

  getOffset() {
    return Math.random() * 100 - 50;
  }
}