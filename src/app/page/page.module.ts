import { RegisterComponent } from '../register/register.component';
import { NgModule } from '@angular/core';

import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';



@NgModule({
    declarations: [
        PagesComponent,
        Graficas1Component,
        ProgressComponent,
        DashboardComponent,
        RegisterComponent
    ],
    exports: [
        Graficas1Component,
        ProgressComponent,
        DashboardComponent,
        PagesComponent,
        RegisterComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PageModule { }
