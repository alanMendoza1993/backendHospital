import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [{
    titulo: 'principal',
    icono: 'mdi mdi-gauge',
    subMenu: [
      { titulo: 'Dashboard', url : '/dashboard'},
      { titulo: 'Progress', url : '/progress'},
      { titulo: 'GRAFICAS', url : '/graficas1'}
    ]
  }]
  constructor() { }
}
