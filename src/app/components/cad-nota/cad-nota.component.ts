import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cad-nota',
  templateUrl: './cad-nota.component.html',
  styleUrls: ['./cad-nota.component.css']
})
export class CadNotaComponent implements OnInit {

  pessoas: any[] = [];
  pesquisarForm: FormGroup;
  msgalert:any = '';
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.authService.listarSemNota().subscribe( (res:any)=>{
      this.pessoas = res;
      if(this.pessoas.length < 1){
        this.msgalert = 'Nenhum candidato com nota pendente!';
      }
    });

    this.pesquisarForm = this.formBuilder.group({
      userName: [null]
    });

  }

  pesquisar(){
    var modal = {
      userName: this.pesquisarForm.value.userName
    }
    // this.authService.listarSemNota().subscribe( (res:any)=>{
    //   this.pessoas = res;
    // } );
  }
  deletar(id: any){
    var modal ={
      idCandidato: id
    }
    this.authService.deletar(modal).subscribe( (res)=>{
      console.log('Deletado com sucesso!');
    } )
    this.authService.listarSemNota().subscribe( (res:any)=>{
      this.pessoas = res;
    });
  }
  abrirCadastro(){
    
  }
  voltar(){
    this.router.navigate(['admin']);
  }
}
