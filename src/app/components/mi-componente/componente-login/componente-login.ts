import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-componente-login',
  imports: [FormsModule],
  templateUrl: './componente-login.html',
  styleUrl: './componente-login.css'
})
export class ComponenteLogin {

  correo:string = "";

  contrasena:string = "";

  constructor( private router: Router){}

  login(){

    if(this.correo === "" || this.contrasena === ""){
      alert("Por favor ingresar correo y contraseña");
    } else{
      this.router.navigateByUrl("/home");
    }
  }

  harcodeoCorreo()
  {
    this.correo = "usuarioPrueba@mail.com";
    this.contrasena = "contraseña123";
  }

}
