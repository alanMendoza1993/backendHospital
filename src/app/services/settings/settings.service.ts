import { Injectable, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  nueva = 0;
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'Link1'
  };

  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAjustes();

  }


  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    this.cargarAjustes();
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
        }
        this.aplicarTema();
        this.seleccionar();
  }

   aplicarTema() {
      document.getElementById('tema').setAttribute('href', this.ajustes.temaUrl);


    }

    seleccionar() {
      let nueva = document.getElementsByClassName('selector');
      var nuevaN = [].slice.call(nueva);
      for (let r of nuevaN) {
        document.getElementById(this.ajustes.tema).classList.add('working');
      }


    }
  }

interface Ajustes {
  temaUrl: string;
  tema: string;
}
