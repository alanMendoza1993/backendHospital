import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    SidebarService,
    SettingsService,
    UsuarioService
  ],
  declarations: []
})
export class ServiceModule { }