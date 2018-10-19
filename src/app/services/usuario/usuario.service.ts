import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import {Usuario} from 'src/app/models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log('servicio usuario');

  }

  crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuarios';
    return this.http.post(url, usuario);
  }
}
