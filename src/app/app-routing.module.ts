import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AvaliadorComponent } from './components/avaliador/avaliador.component';
import { CadAcessoComponent } from './components/cad-acesso/cad-acesso.component';
import { CrudAcesspComponent } from './components/cad-acesso/crud-acessp/crud-acessp.component';
import { CadCandidatoComponent } from './components/cad-candidato/cad-candidato.component';
import { CrudCandidatoComponent } from './components/cad-candidato/crud-candidato/crud-candidato.component';
import { CadItemComponent } from './components/cad-item/cad-item.component';
import { CrudItemComponent } from './components/cad-item/crud-item/crud-item.component';
import { CadNotaComponent } from './components/cad-nota/cad-nota.component';
import { CadOficioComponent } from './components/cad-oficio/cad-oficio.component';
import { CrudOficioComponent } from './components/cad-oficio/crud-oficio/crud-oficio.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'private', component: PrivateComponent },
  { path: 'admin', component: AdminComponent },

  { path: 'cad-item', component: CadItemComponent },
  { path: 'cad-acesso', component: CadAcessoComponent },
  { path: 'cad-nota', component: CadNotaComponent },
  { path: 'cad-candidato', component: CadCandidatoComponent },
  { path: 'cad-oficio', component: CadOficioComponent },
  { path: 'crud-candidato', component: CrudCandidatoComponent },
  { path: 'crud-acesso', component: CrudAcesspComponent },
  { path: 'crud-oficio', component: CrudOficioComponent },
  { path: 'crud-item', component: CrudItemComponent },
  { path: 'avaliador', component: AvaliadorComponent },
  { path: 'empresa', component: EmpresaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
