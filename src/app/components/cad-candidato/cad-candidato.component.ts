import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cad-candidato',
  templateUrl: './cad-candidato.component.html',
  styleUrls: ['./cad-candidato.component.css']
})
export class CadCandidatoComponent implements OnInit {

  msgalert: any = '';
  candidatos: any[] = [];
  pesquisarForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listar();
  }
  listar(){
    this.authService.listarCandidatos().subscribe( (res:any)=>{
      this.candidatos = res;
      if(this.candidatos.length < 1){
        this.msgalert = 'Nenhum candidato cadastrado!';
      }
    });
  }
  pesquisar(){
    
  }
  abrirCadastro(){
    
  }
  voltar(){
    this.router.navigate(['admin']);
  }
  editar(id: any){

  }
  deletar(id: any){

  }
  limparFiltro(){
    this.listar();
  }
}
