import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
    titulo: string;
  constructor( private router: Router,
                private title: Title,
                private meta: Meta ) {
    this.getData()
    .subscribe( data => {
      this.titulo = data.titulo;
      console.log(data);
      this.title.setTitle(this.titulo);
      const metaTag: MetaDefinition = {
        content: data.meta.content ,
        name: 'description'
      };

      this.meta.updateTag(metaTag);
    });

  }

  ngOnInit() {
  }

  getData() {
    return this.router.events.
    pipe( filter( evento => evento instanceof ActivationEnd ),
    filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
    map( (evento: ActivationEnd) => evento.snapshot.data ));
  }

}
