import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-acessp',
  templateUrl: './crud-acessp.component.html',
  styleUrls: ['./crud-acessp.component.css']
})
export class CrudAcesspComponent implements OnInit {

  contas:any[] = [];
  crudForm: FormGroup;
  tipoConta:any = '';
  crudFormEmpresa: FormGroup;
  crudFormAdmin: FormGroup;
  crudFormAvaliador: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.crudForm = this.formBuilder.group({
      userName: [null],
      pass: [null],
      roleId: [null]
    });
    this.authService.buscarTipoConta().subscribe( (res:any)=>{
      this.contas = res;
      console.log(res);
    } );

    this.crudForm = this.formBuilder.group({
      email: [null],
      senha: [null],
      tipoConta: [null]
    });

    this.crudFormEmpresa = this.formBuilder.group({
      email: [null],
      senha: [null],
      tipoConta: [null]
    });

    this.crudFormAdmin = this.formBuilder.group({
      nome: [null]
    });

    this.crudFormAvaliador = this.formBuilder.group({
      nome: [null],
      cpf: [null]
    });

  }
  fechar(){
    this.router.navigate(['cad-acesso']);
  }
  avancar(){
    if(this.crudForm.value.tipoConta!= 'null' ){
      this.tipoConta = this.crudForm.value.tipoConta;
    }else{
      console.log('tipo de conta null');
    }
  }
  cadastrarAdmin(){
    var modal ={
      email: this.crudForm.value.email,
      senha: this.crudForm.value.senha,
      tipoPerfil: this.crudForm.value.tipoConta,
    }
    this.authService.create(modal).subscribe( (res:any)=>{
      const idUsuario = res[0].idUsuario;
      console.log(idUsuario);
      if(idUsuario != false){
        var modal = {
          idUsuario: idUsuario,
          nome: this.crudFormAdmin.value.nome
        }
        this.authService.createAdmin(modal).subscribe( (res:any)=>{
          console.log(res);
          Swal.fire({  
            icon: 'success',  
            title: 'Cadastro realizado com sucesso!',  
            showConfirmButton: false,  
            timer: 2000  
          });
          setTimeout(() => {
            this.router.navigate(['cad-acesso']);
          }, 2000); 
        } );
      }
    } );
    
  }
  cadastrarAvaliador(){
    var modal ={
      email: this.crudForm.value.email,
      senha: this.crudForm.value.senha,
      tipoPerfil: this.crudForm.value.tipoConta,
    }
    this.authService.create(modal).subscribe( (res:any)=>{
      const idUsuario = res[0].idUsuario;
      console.log(idUsuario);
      if(idUsuario != false){
        var modal = {
          idUsuario: idUsuario,
          nome: this.crudFormAvaliador.value.nome,
          cpf: this.crudFormAvaliador.value.cpf
        }
        this.authService.createAvaliador(modal).subscribe( (res:any)=>{
          console.log(res);
          Swal.fire({  
            icon: 'success',  
            title: 'Cadastro realizado com sucesso!',  
            showConfirmButton: false,  
            timer: 2000  
          });
          setTimeout(() => {
            this.router.navigate(['cad-acesso']);
          }, 2000); 
        } );
       }
    } );
    
  }
}
