import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-componente-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './componente-login.html',
  styleUrl: './componente-login.css'
})
export class ComponenteLogin {

  email:string = "";

  contrasena:string = "";
}
