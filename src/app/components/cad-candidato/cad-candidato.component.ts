import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
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
    this.router.navigate(['crud-candidato']);
  }
  voltar(){
    this.router.navigate(['admin']);
  }
  editar(id: any){

  }
  deletar(id: any){
    Swal.fire({  
      icon: 'warning',  
      title: 'Tem certeza que deseja excluir?',  
      showCancelButton: true,
			confirmButtonColor: '#59b479',
			cancelButtonColor: '#e36e6e',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Excluir'
    }).then( (result)=>{
      if (result.value) {
        var modal= {
          idCandidato: id
        }
        this.authService.deletarCandidato(modal).subscribe( (res: any)=>{
          if(res){
            Swal.fire({  
              icon: 'success',  
              title: 'Candidato deletado com sucesso!',  
              showConfirmButton: false,  
              timer: 2000  
            });
          }
        });
        this.listar();
      }else{
        return;
      }
    } );
  }
  limparFiltro(){
    this.listar();
  }
}
