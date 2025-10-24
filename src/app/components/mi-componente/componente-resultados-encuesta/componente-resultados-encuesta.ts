import { Component } from '@angular/core';
import { EncuestaService } from '../../../services/encuesta';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-componente-resultados-encuesta',
  imports: [CommonModule],
  templateUrl: './componente-resultados-encuesta.html',
  styleUrl: './componente-resultados-encuesta.css'
})
export class ComponenteResultadosEncuesta {

  resultados: any[] = [];

  constructor(private encuestaService: EncuestaService){}

  async ngOnInit(){

    try{
      this.resultados = await this.encuestaService.obtenerResultados();

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los resultados.',
        icon: 'error'
      });

    }
  }

}
