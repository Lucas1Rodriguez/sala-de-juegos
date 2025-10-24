import { Injectable } from '@angular/core';
import { Supabase } from './supabase';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

    constructor(private supabaseService: Supabase){}

    async enviarEncuesta(encuesta: any) {
        const supabase = this.supabaseService.getCliente();
    
        const { data, error } = await supabase
        .from('Encuestas')
        .insert([encuesta]);

        if (error) throw error;
        return data;
    }

    async obtenerResultados() {
        const supabase = this.supabaseService.getCliente();

        const { data, error } = await supabase
        .from('Encuestas')
        .select('*');
        
        if (error) throw error;
        return data;
    }
}