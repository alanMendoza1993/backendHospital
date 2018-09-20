import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  progresoA = 50;
  progresoV = 50;
  leyendaA = 'Leyenda Azul';
  leyendaV = 'Leyenda Verde';
  constructor() {
   }

  ngOnInit() {

  }

  actualizar(event: number) {
    this.progresoA = event;
  }
}
