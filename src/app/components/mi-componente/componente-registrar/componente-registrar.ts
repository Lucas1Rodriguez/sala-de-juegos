import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

}
