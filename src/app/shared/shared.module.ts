import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        HeaderComponent
    ],
    exports: [
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        HeaderComponent
    ]
})

export class SharedModule { }
