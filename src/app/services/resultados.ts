import { Injectable } from '@angular/core';
import { Supabase } from './supabase';


@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

    constructor(private supabaseService: Supabase){}

    async guardarResultados(usuario: string | null, juego: string, puntaje: number) {
        const supabase = this.supabaseService.getCliente();
    
        const { data, error } = await supabase
            .from('Resultados')
            .insert([{ usuario, juego, puntaje }]);

        if (error) {
            throw error;
        }
        return data;
    }

    async obtenerResultados(juego?:string) {
        let query = this.supabaseService.getCliente().from('Resultados').select('*');

        if (juego) {
        query = query.eq('juego', juego);
        }

        query = query.order('puntaje', { ascending: false });

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }
}