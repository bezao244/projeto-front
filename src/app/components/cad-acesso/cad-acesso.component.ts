import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cad-acesso',
  templateUrl: './cad-acesso.component.html',
  styleUrls: ['./cad-acesso.component.css']
})
export class CadAcessoComponent implements OnInit {
  msgalert: any = '';
  pessoas: any[] = [];
  pesquisarForm: FormGroup;
  idUsuarioLogado: any;
    constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.authService.listar().subscribe( (res:any)=>{
      this.pessoas = res;
      if(this.pessoas.length < 1){
        this.msgalert = 'Nenhum acesso cadastrado!';
      }
    });

    this.pesquisarForm = this.formBuilder.group({
      email: [null]
    });
    let getId: any = localStorage.getItem('user');
    this.idUsuarioLogado = parseInt(getId);
    console.log(this.idUsuarioLogado);
  }

  pesquisar(){
    var modal = {
      email: this.pesquisarForm.value.email
    }
    this.authService.listarPorNome(modal).subscribe( (res:any)=>{
      this.pessoas = res;
    } );
  }
  abrirCadastro(){
    this.router.navigate(['crud-acesso']);
  }
  voltar(){
    this.router.navigate(['admin']);
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
          idUsuario: id
        }
        this.authService.deletar(modal).subscribe( (res: any)=>{
          if(res ==  true){
            Swal.fire({  
              icon: 'success',  
              title: 'Usuário deletado com sucesso!',  
              showConfirmButton: false,  
              timer: 2000  
            });
          }
        });
        this.authService.listar().subscribe( (res:any)=>{
          this.pessoas = res;
          if(this.pessoas.length < 1){
            this.msgalert = 'Nenhum acesso cadastrado!';
          }
        });
      }else{
        return;
      }
    } );
  }
  limparFiltro(){
    this.authService.listar().subscribe( (res:any)=>{
      this.pessoas = res;
      if(this.pessoas.length < 1){
        this.msgalert = 'Nenhum acesso cadastrado!';
      }
    });
  }
  editar(id:any){
    //logica para editar
  }
}
