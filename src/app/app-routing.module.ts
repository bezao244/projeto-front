import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AvaliadorComponent } from './components/avaliador/avaliador.component';
import { CadAcessoComponent } from './components/cad-acesso/cad-acesso.component';
import { CrudAcesspComponent } from './components/cad-acesso/crud-acessp/crud-acessp.component';
import { CadCandidatoComponent } from './components/cad-candidato/cad-candidato.component';
import { CadNotaComponent } from './components/cad-nota/cad-nota.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'private', component: PrivateComponent},
  {path:'admin', component: AdminComponent},
  
  {path:'cad-acesso', component: CadAcessoComponent},
  {path:'cad-nota', component: CadNotaComponent},
  {path:'cad-candidato', component: CadCandidatoComponent},
  {path:'crud-acesso', component: CrudAcesspComponent},
  {path:'avaliador', component: AvaliadorComponent},
  {path:'empresa', component: EmpresaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
