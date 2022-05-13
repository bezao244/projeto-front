import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cad-nota',
  templateUrl: './cad-nota.component.html',
  styleUrls: ['./cad-nota.component.css']
})
export class CadNotaComponent implements OnInit {

  pessoas: any[] = [];
  pesquisarForm: FormGroup;
  msgalert:any = '';
  abrirCadastroNota:boolean = false;
  candidatoNota: any[] =  [];
  crudFormNota: FormGroup;
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listar();

    this.pesquisarForm = this.formBuilder.group({
      nome: [null]
    });
    this.crudFormNota = this.formBuilder.group({
      notaFinal: [null]
    });

  }
  listar(){
    this.authService.listarSemNota().subscribe( (res:any)=>{
      this.pessoas = res;
      if(this.pessoas.length < 1){
        this.msgalert = 'Nenhum candidato com nota pendente!';
      }
    });
  }
  pesquisar(){
    var modal = {
      nome: this.pesquisarForm.value.nome
    }
    // this.authService.listarSemNota().subscribe( (res:any)=>{
    //   this.pessoas = res;
    // } );
  }
  adicionar(id:any){
    var modal = {
      idCandidato: id
    }
    this.authService.buscarDadosCandidato(modal).subscribe( (res: any)=>{
      this.candidatoNota = res;
      this.abrirCadastroNota = true;
    } );
    
  }
  adicionarNota(id: any){
    var modal = {
      notaFinal: this.crudFormNota.value.notaFinal,
      idCandidato: id
    }
    this.authService.adicionarNotaCandidato(modal).subscribe( (res: any)=>{
      if(res){
        Swal.fire({  
          icon: 'success',  
          title: 'Nota adicionada com sucesso!',  
          showConfirmButton: false,  
          timer: 2000  
        });
        this.listar();
        this.abrirCadastroNota = false;
      }else{
        Swal.fire({  
          icon: 'warning',  
          title: 'Erro ao adicionar nota, tente novamente!',  
          showConfirmButton: true
        });
      }
    } )
  }
  voltar(){
    this.router.navigate(['admin']);
  }
}
