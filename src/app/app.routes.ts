
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './page/progress/progress.component';
import { Graficas1Component } from './page/graficas1/graficas1.component';
import { Component } from '@angular/core';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './page/pages.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTING = RouterModule.forRoot( appRoutes, {useHash: true} );
