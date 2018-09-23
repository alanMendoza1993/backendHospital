import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public ajustes: SettingsService) { }

  ngOnInit() {
    this.ajustes.seleccionar();
  }

  cambiarValor(valor: string,  Link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    const url = `assets/css/colors/${ valor }.css`;
    this.ajustes.ajustes.temaUrl = url;
    this.ajustes.ajustes.tema = Link;

    for (let ref of selectores) {
     if ( document.getElementsByClassName('working')) {
       ref.classList.remove('working');
     }
     this.ajustes.guardarAjustes();
     }

  }


  }

