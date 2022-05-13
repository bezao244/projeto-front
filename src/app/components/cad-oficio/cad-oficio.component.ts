import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cad-oficio',
  templateUrl: './cad-oficio.component.html',
  styleUrls: ['./cad-oficio.component.css']
})
export class CadOficioComponent implements OnInit {

  msgalert: any = '';
  oficios: any[] = [];
  pesquisarForm: FormGroup;
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listar(); 
    this.pesquisarForm = this.formBuilder.group({
      oficio: [null]
    }); 
  }
  listar(){
    this.authService.buscarOficios().subscribe( (res:any)=>{
      this.oficios = res;
      if(this.oficios.length < 1){
        this.msgalert = 'Nenhum oficio cadastrado!';
      }
    });
  }
  pesquisar(){
    var modal = {
      oficio: this.pesquisarForm.value.oficio
    }
    
  }
  abrirCadastro(){
    this.router.navigate(['crud-oficio']);
  }
  voltar(){
    this.router.navigate(['admin']);
  }
  editar(id: any){

  }
  deletar(id: any){
    console.log(id);
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
          idOficio: id
        }
        this.authService.deletarOficio(modal).subscribe( (res: any)=>{
          if(res){
            Swal.fire({  
              icon: 'success',  
              title: 'Oficio deletado com sucesso!',  
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

}
