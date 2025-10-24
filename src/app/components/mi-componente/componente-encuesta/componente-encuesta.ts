import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { Supabase } from '../../../services/supabase';
import { EncuestaService } from '../../../services/encuesta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-componente-encuesta',
  imports: [ReactiveFormsModule],
  templateUrl: './componente-encuesta.html',
  styleUrl: './componente-encuesta.css'
})
export class ComponenteEncuesta implements OnInit{

  usuario: any = null;
  nombreUsuario: string | null = null;
  encuestaForm: FormGroup;
  
  async ngOnInit(){
    const sesion = await this.supabaseService.getSession();
    if (sesion?.user) {
      this.usuario = sesion.user;
    }
    const perfil = await this.supabaseService.obtenerPerfil(this.usuario.id);
      if (perfil) {
        this.nombreUsuario = perfil;
      }
  }

  constructor(private fb: FormBuilder, private encuestaService: EncuestaService, private supabaseService: Supabase){

    this.encuestaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      edad: [null, [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: [null, [Validators.required, Validators.min(9999999),Validators.max(9999999999)]],
      dificultad: ['', [Validators.required]],
      favorito: this.fb.group({
        ahorcado: [false],
        mayorMenor: [false],
        bolita: [false],
        preguntados: [false]}),
      comentario: ['', [Validators.required,Validators.minLength(10)]]
    });
  }


  async enviar() {
    if (this.encuestaForm.valid) {

      const favoritoArray = Object.entries(this.encuestaForm.value.favorito)
        .filter(([key, value]) => value)  // solo los true
        .map(([key]) => key);

      const encuesta = {
        usuario: this.nombreUsuario ?? null,
        ...this.encuestaForm.value,
        favorito: favoritoArray
      };


      try{
        await this.encuestaService.enviarEncuesta(encuesta);
      
        Swal.fire({
          title: '<strong>Encuesta enviada!</strong>',
          html: 'Te agradecemos por completar la encuesta!</b>',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
          });
        
          this.encuestaForm.reset();
      }catch{
        Swal.fire({
          title: '<strong>Error!</strong>',
          html: 'No se pudo enviar la encuesta. Intenta nuevamente.</b>',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
          });
      }
    } else
    {
      const nombre = this.encuestaForm.get('nombre');
      const apellido = this.encuestaForm.get('apellido');
      const edad = this.encuestaForm.get('edad');
      const telefono = this.encuestaForm.get('telefono')
      const dificultad = this.encuestaForm.get('dificultad');
      const comentario = this.encuestaForm.get('comentario');

      const camposInvalidos = [nombre, apellido, edad, telefono, dificultad, comentario]
      .filter(campo => campo?.invalid);

      if (camposInvalidos.length > 1) {
        Swal.fire({
          title: '<strong>Formulario incompleto</strong>',
          html: 'Por favor, completa correctamente todos los campos obligatorios.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      } else if (camposInvalidos.length === 1) 
      {
        const campo = camposInvalidos[0];
        let mensaje = '';
        switch (campo) {
          case nombre:
            mensaje = 'El nombre debe contener más de 2 caracteres.';
            break;
          case apellido:
            mensaje = 'El apellido debe contener más de 2 caracteres.';
            break;
          case edad:
            mensaje = 'La edad debe estar entre 18 y 99 años.';
            break;
          case telefono:
            mensaje = 'El número de telefono tiene que tener entre 8 y 10 digitos.';
            break;
          case dificultad:
            mensaje = 'Debe elegir una dificultad.';
            break;
          case comentario:
            mensaje = 'El comentario debe contener más de 10 caracteres.';
            break;
        }
        Swal.fire({
          title: '<strong>Campo inválido</strong>',
          html: mensaje,
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });

      }

    }
  }
}
