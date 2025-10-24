import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Supabase } from '../services/supabase';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private supabaseService: Supabase, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const usuario = await this.supabaseService.obtenerUsuario();

    if (!usuario) {
      this.router.navigate(['/login']);
      return false;
    }

    const rol = await this.supabaseService.obtenerRol(usuario.id);

    console.log(rol);

    if (!rol || rol.trim().toLowerCase() !== 'admin') {
      this.router.navigate(['/']);
      return false;
    }


    return true;
  }
}