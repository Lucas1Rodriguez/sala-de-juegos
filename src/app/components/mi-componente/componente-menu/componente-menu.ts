import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Supabase } from '../../../services/supabase';

@Component({
  selector: 'app-componente-menu',
  imports: [RouterLink],
  templateUrl: './componente-menu.html',
  styleUrls: ['./componente-menu.css']
})
export class ComponenteMenu implements OnInit{

  sesion: any = null;

  constructor( private supabase: Supabase ) {}

  async ngOnInit() {
    this.sesion = await this.supabase.getSession();
  }

  cerrarSesion(){
    this.supabase.cerrarSesion();
  }

}
