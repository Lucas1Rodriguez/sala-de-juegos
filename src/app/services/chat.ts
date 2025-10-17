import { Injectable } from '@angular/core';
import { Supabase } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class Chat {
  
  constructor(private supabaseService : Supabase) {}

  async cargarMensajes() {
    const supabase = this.supabaseService.getCliente();
    const { data, error } = await supabase
      .from('Chat')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async enviarMensaje(mensaje: string, usuario: string) {
    const supabase = this.supabaseService.getCliente();
    const { data, error } = await supabase
      .from('Chat')
      .insert([{ mensaje, usuario }])
      .select();
    if (error) {
    console.error('Error al insertar mensaje en Supabase:', error.message);
    throw error;
    }

    console.log('Mensaje insertado:', data);
    return data[0];
  }
}
