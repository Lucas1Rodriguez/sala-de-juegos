import { Component, OnInit } from '@angular/core';
import { Chat } from '../../../services/chat';
import { Supabase } from '../../../services/supabase';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componente-chat',
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './componente-chat.html',
  styleUrl: './componente-chat.css'
})
export class ComponenteChat implements OnInit {

  mensaje: string = '';
  mensajes: any[] = [];
  nuevoMensaje = '';
  nombreUsuario: string | null = null;
  usuario: any = null;

  constructor(private chat: Chat, private supabase: Supabase) {}

  async ngOnInit() {
    const sesion = await this.supabase.getSession();
    if (sesion?.user) {
      this.usuario = sesion.user;
    }

    const perfil = await this.supabase.obtenerPerfil(this.usuario.id);
      if (perfil) {
        this.nombreUsuario = perfil;
      }

    this.chat.cargarMensajes()
  }

  enviar() {
   if (this.nuevoMensaje.trim() === '') return;
    this.chat.enviarMensaje(this.nuevoMensaje, this.usuario);
    this.nuevoMensaje = '';
    this.mensaje = '';
  }
}
