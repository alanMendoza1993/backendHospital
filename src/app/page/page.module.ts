import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { NgModule } from '@angular/core';

import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

import { ChartsModule } from 'ng2-charts';
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        PagesComponent,
        Graficas1Component,
        ProgressComponent,
        DashboardComponent,
        IncrementadorComponent,
        RegisterComponent,
        GraficaDonaComponent,
        AccountSettingsComponent
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
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule
    ]
})

export class PageModule { }
