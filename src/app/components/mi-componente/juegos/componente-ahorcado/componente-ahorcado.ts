import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoService } from '../../../../services/ahorcado';
import { ResultadosService } from '../../../../services/resultados';
import { Supabase } from '../../../../services/supabase';

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
  ganado:boolean = false;
  entrandoAJugar = false;
  jugando:boolean = false;
  usuario: any = null;
  nombreUsuario: string | null = null;


  constructor( private ahorcadoService: AhorcadoService, private resultadosService: ResultadosService, private supabaseService: Supabase) {}

  async ngOnInit() {
    this.entrandoAJugar = false;
    const sesion = await this.supabaseService.getSession();
    if (sesion?.user) {
      this.usuario = sesion.user;
    }
    const perfil = await this.supabaseService.obtenerPerfil(this.usuario.id);
      if (perfil) {
        this.nombreUsuario = perfil;
      }
  }

  nuevoJuego() {
    this.ganado = false;
    this.entrandoAJugar = true;
    this.jugando = true;
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
    this.jugando = false;
    await this.resultadosService.guardarResultados(this.nombreUsuario, 'Ahorcado', this.puntaje);
    return;
  }else if (this.intentos === 0) {
    this.mensaje = `💀 Perdiste. La palabra era: ${this.palabraSecreta}`;
    this.jugando = false;
  }
  
  }
}
