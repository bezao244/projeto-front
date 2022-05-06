import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cad-acesso',
  templateUrl: './cad-acesso.component.html',
  styleUrls: ['./cad-acesso.component.css']
})
export class CadAcessoComponent implements OnInit {
  
  pessoas: any[] = [];
  pesquisarForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.authService.listar().subscribe( (res:any)=>{
      this.pessoas = res;
      console.log(this.pessoas);
    });

    this.pesquisarForm = this.formBuilder.group({
      userName: [null]
    });

  }

  pesquisar(){
    var modal = {
      userName: this.pesquisarForm.value.userName
    }
    this.authService.listarPorNome(modal).subscribe( (res:any)=>{
      this.pessoas = res;
    } );
  }
  abrirCadastro(){

  }
}
