import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '../../../services/supabase';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-componente-registrar',
  imports: [FormsModule],
  templateUrl: './componente-registrar.html',
  styleUrl: './componente-registrar.css'
})
export class ComponenteRegistrar {

  correo: string = "";

  usuario: string = "";

  contrasena: string = "";

  constructor( private router: Router, private supabase : Supabase){}

  async registrar(){

    if(this.correo === "" || this.usuario === "" || this.contrasena === ""){
      Swal.fire({
        title: 'Error!',
        html: 'Por favor ingresar <b>correo, usuario y contraseña</b> para poder registrarse.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
        });
    } else{
      try {
        const { data, error } = await this.supabase.registrarse(this.correo, this.contrasena);
        console.log(data);

        if (error) {
          if (error.message.includes("User already registered")) {
            Swal.fire({
              title: 'Correo ya registrado',
              html: 'El correo ingresado ya está registrado.',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            });
          }else{
             Swal.fire({
              title: 'Campos incorrectos',
              html: 'Error al registrarse. Verificar que los campos sean correctos.',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            });
          }
          return;
        }
        const user = data.user;

        if (!user) {
          alert("Error: No se pudo obtener el usuario después del registro.");
          return;
        }

        const insertarPerfil = await this.supabase.insertarPerfil(user.id, this.usuario, this.correo);
        if (insertarPerfil.error) {
          alert("Error al guardar el perfil: " + insertarPerfil.error.message);
          return;
        }

        Swal.fire({
          title: 'Registro exitoso!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          didClose: () => {
            this.router.navigateByUrl("/home");
          }
        });
        
        
      } catch (err: any) {
        alert("Ocurrió un error inesperado: " + err.message);
      }
    }
  }

  harcodeoCorreo()
  {
    this.correo = "usuarioPrueba@mail.com";
    this.usuario = "usuarioDePrueba1";
    this.contrasena = "contrasena123";
  }

}
