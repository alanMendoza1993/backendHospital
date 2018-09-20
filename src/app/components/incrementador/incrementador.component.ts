import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() leyenda = 'Leyenda';
  @Input() progreso: number = 50;
  @ViewChild('txtProgreso') txtProgreso: ElementRef;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  OnChanges(changes: number) {
    this.cambioValor.emit(this.progreso);
  }

  cambioV(valor: number) {
  if (valor >= 100) {
    this.progreso = 100;
  }
  if (valor <= 0) {
    this.progreso = 0;
  }
    this.cambioValor.emit(this.progreso);
  }
  cambiarValor( valor: number ) {
    if ((this.progreso >= 100  && valor === 5 ) || (this.progreso <= 0  && valor === -5)) {
      console.log('return'); return; } else {
    this.progreso += valor;
    this.cambioValor.emit( this.progreso );
    this.txtProgreso.nativeElement.focus();
    }
  }

}
