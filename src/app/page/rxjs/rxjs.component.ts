import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { map, filter, retry} from 'rxjs/operators';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
  this.regresaObservable()
  .subscribe( numero => {
    console.log('numero: ', numero);
  }, error => {
    console.log('error', error);
  }, () => {
    console.log('termino!');
  });
  }

  ngOnInit() {
  }



  regresaObservable(): Observable<any> {

  let obs = new Observable( (observer: Subscriber<any>) => {
    let contador = 0;
   let intervalo = setInterval( () => {
     contador += 1;

     const salida = {
       valor: contador
     };

     observer.next(salida);
    /*  if (contador === 2) {
       clearInterval(intervalo);
       observer.error('Auxilio');
     } */
     if ( contador === 3) {
       clearInterval(intervalo);
       observer.complete();
     }

   }, 1000);
 }).pipe(
   map( resp => resp.valor),
   filter((valor, index) => {
     if ( valor % 2) {
       return true;
      } else {
        return false;
      }
       })
 );
  return obs;
  }


}