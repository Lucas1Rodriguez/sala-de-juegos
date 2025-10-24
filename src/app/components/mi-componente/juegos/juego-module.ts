import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponenteAhorcado } from './componente-ahorcado/componente-ahorcado';
import { ComponenteBolita } from './componente-bolita/componente-bolita';
import { ComponenteMayorMenor } from './componente-mayor-menor/componente-mayor-menor';

const rutas: Routes = [
  { path: 'ahorcado', component: ComponenteAhorcado },
  { path: 'bolita', component: ComponenteBolita },
  { path: 'mayorMenor', component: ComponenteMayorMenor},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponenteAhorcado, 
    ComponenteBolita, 
    ComponenteMayorMenor,
    RouterModule.forChild(rutas)
  ],
})
export class JuegoModule { }
