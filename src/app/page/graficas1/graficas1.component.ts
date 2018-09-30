import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {



  graficos: any[] = [
    {
      'labels': ['Mujeres', 'Hombres', 'niños'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'Ventas de pan'
    },
    {
      'labels': ['Producto 1', 'Producto 2'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Entrevistados'
    },
     {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': '¿Le Gustan el pan?'
    },
    {
      'labels': ['No', 'Si'],
      'data':  [4, 88],
      'type': 'doughnut',
      'leyenda': '¿Vendria nuevamente?'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
