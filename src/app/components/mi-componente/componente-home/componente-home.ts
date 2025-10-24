import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supabase } from '../../../services/supabase';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componente-home',
  imports: [ CommonModule ],
  templateUrl: './componente-home.html',
  styleUrl: './componente-home.css'
})
export class ComponenteHome implements OnInit {
  
  usuario: any = null;
  nombreUsuario: string | null = null;

  constructor( private router: Router, private supabase: Supabase) {}
  
  async ngOnInit() {
    const sesion = await this.supabase.getSession();
    if (sesion?.user) {
      this.usuario = sesion.user;
    }
    const perfil = await this.supabase.obtenerPerfil(this.usuario.id);
      if (perfil) {
        this.nombreUsuario = perfil;
      }
  }
  
  juegoAhorcado(){
    this.router.navigateByUrl("juegos/ahorcado");
  }

  juegoBolita(){
    this.router.navigateByUrl("juegos/bolita");
  }

  juegoMayorMenor(){
    this.router.navigateByUrl("juegos/mayorMenor");
  }

  chat(){
    this.router.navigateByUrl("/chat");
  }

  resultadoEncuesta(){
    this.router.navigateByUrl("/resultadosJuegos");
  }
}
