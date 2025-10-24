import { Component, OnInit } from '@angular/core';
import { Chat } from '../../../services/chat';
import { Supabase } from '../../../services/supabase';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componente-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './componente-chat.html',
  styleUrl: './componente-chat.css'
})
export class ComponenteChat implements OnInit {

  mensaje: string = '';
  mensajes: any[] = [];
  nuevoMensaje = '';
  nombreUsuario: string = '';
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

    this.mensajes = await this.chat.cargarMensajes();

    const supabase = this.supabase.getCliente();
    supabase
      .channel('chat-room')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Chat' }, payload => {
        this.mensajes.push(payload.new);
      })
      .subscribe();
  }

  enviar() {
    if (this.mensaje.trim() === '') return;
    this.chat.enviarMensaje(this.mensaje, this.nombreUsuario);
    this.mensaje = '';
  }
}
