import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crud-acessp',
  templateUrl: './crud-acessp.component.html',
  styleUrls: ['./crud-acessp.component.css']
})
export class CrudAcesspComponent implements OnInit {

  crudForm: FormGroup;

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

  }

  cadastrar(){
    var modal = {
      userName: this.crudForm.value.userName,
      pass: this.crudForm.value.pass,
      roleId: this.crudForm.value.roleId
    }
    this.authService.create(modal).subscribe( (res)=>{
      if(res == true){
        this.router.navigate(['cad-acesso']);
      }else{
        console.log('Dados vazios!');
      }
    } );
  }
  fechar(){
    this.router.navigate(['cad-acesso']);
  }
}
