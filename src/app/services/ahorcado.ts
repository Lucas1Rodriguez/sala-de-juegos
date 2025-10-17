import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AhorcadoService {
  private palabras: string[] = ['SANLORENZO', 'CUERVO', 'ARGENTINA', 'NYARLATHOTEP', 'OLIVIA', 'EMMA', 'CLEOPATRA', 'KIRA', 'THOR', 'MIA'];

  private palabraSecreta: string = '';
  private letrasAdivinadas: string[] = [];

  iniciarJuego(): string {
    const index = Math.floor(Math.random() * this.palabras.length);
    this.palabraSecreta = this.palabras[index];
    this.letrasAdivinadas = [];
    return this.palabraSecreta;
  }

  verificarLetra(letra: string): string {
    if (this.palabraSecreta.includes(letra)) {
      this.letrasAdivinadas.push(letra);
      return 'acertada';
    }

    return 'fallo';
  }

  getPalabraOculta(): string {
    return this.palabraSecreta
      .split('')
      .map(l => (this.letrasAdivinadas.includes(l) ? l : '_'))
      .join(' ');
  }

  haGanado(): boolean {
    return !this.getPalabraOculta().includes('_');
  }

  getPalabraSecreta(): string {
    return this.palabraSecreta;
  }
}
