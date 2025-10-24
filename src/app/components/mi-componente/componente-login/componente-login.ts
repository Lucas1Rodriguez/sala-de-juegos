import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '../../../services/supabase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-componente-login',
  imports: [FormsModule],
  templateUrl: './componente-login.html',
  styleUrl: './componente-login.css'
})
export class ComponenteLogin {

  correo:string = "";

  contrasena:string = "";

  constructor( private router: Router, private supabase: Supabase){}


  async login(){

    if(this.correo === "" || this.contrasena === ""){
      Swal.fire({
        title: '<strong>Error!</strong>',
        html: 'Por favor ingresar <b>correo y contraseña</b>',
        icon: 'error',
        confirmButtonText: 'Aceptar'
        });
    } else{
      try{
        const { data, error } = await this.supabase.login(this.correo, this.contrasena);

        if (error) {
          Swal.fire({
          title: 'Error!',
          html: '<b>Correo o contraseña</b> incorrectos.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
          });
          console.error("Error al iniciar sesión:", error.message);
          return;
        }

        // El login fue exitoso
        console.log("Sesión iniciada:", data);
        this.router.navigateByUrl("/home");

    } catch (e: any) {
      alert("Error inesperado al iniciar sesión: " + e.message);
      console.error(e);
    }
    }
  }

  harcodeoCorreo()
  {
    this.correo = "usuarioPrueba16@mail.com";
    this.contrasena = "contrasena123";
  }

  harcodeoAdmin()
  {
    this.correo = "usuarioPrueba222@mail.com";
    this.contrasena = "contrasena123";
  }

}
