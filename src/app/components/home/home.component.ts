import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  crudForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router:Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      userName: [null],
      pass: [null]
    });
  }
  login(){
    var modal = {
      userName: this.crudForm.value.userName,
      pass: this.crudForm.value.pass
    }
    this.authService.singin(modal).subscribe( (res:any) => {
      var roleId = res[0].roleId;
      if(roleId == 'Administrador'){
        this.router.navigate(['admin']);
      }else if(roleId == 'Empresa'){
        //this.router.navigate(['empresa']);
      }else if(roleId == 'Avaliador'){
        //this.router.navigate(['avaliador']);
      }else{
        console.log('Usuário ou senha inválidos!');
      }
      
    }), (err: any)=>{
      console.log(err);
    }
  }

}
