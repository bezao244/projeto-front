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
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CadCandidatoComponent } from './components/cad-candidato/cad-candidato.component';
import { CrudCandidatoComponent } from './components/cad-candidato/crud-candidato/crud-candidato.component';
import { CadOficioComponent } from './components/cad-oficio/cad-oficio.component';
import { CrudOficioComponent } from './components/cad-oficio/crud-oficio/crud-oficio.component';

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
    EmpresaComponent,
    CadCandidatoComponent,
    CrudCandidatoComponent,
    CadOficioComponent,
    CrudOficioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      cancelButtonType: 'default btn-sm',
      confirmButtonType: 'primary btn-sm'
    }),
  ],
  providers: [
    {provide: JWT_OPTIONS,useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent],
  // exports: [
  //   AccordionModule.forRoot()
  // ]
})
export class AppModule { }
