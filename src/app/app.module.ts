import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { AdminComponent } from './components/admin/admin.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CadAcessoComponent } from './components/cad-acesso/cad-acesso.component';
import { CadNotaComponent } from './components/cad-nota/cad-nota.component';
import { CrudAcesspComponent } from './components/cad-acesso/crud-acessp/crud-acessp.component';
import { AvaliadorComponent } from './components/avaliador/avaliador.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivateComponent,
    AdminComponent,
    CadAcessoComponent,
    CadNotaComponent,
    CrudAcesspComponent,
    AvaliadorComponent,
    EmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: JWT_OPTIONS,useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
