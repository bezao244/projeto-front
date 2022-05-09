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
  msgalert: any = '';
  crudForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      email: [null],
      senha: [null]
    });
    
  }
  login() {
    var modal = {
      email: this.crudForm.value.email,
      senha: this.crudForm.value.senha
    }
    this.authService.singin(modal).subscribe((res: any) => {
      if (res.ok != false) {
        var tipoPerfil = res.tipoPerfil;
        if (tipoPerfil == 'Administrador') {
          this.router.navigate(['admin']);
        } else if (tipoPerfil == 'Empresa') {
          this.router.navigate(['empresa']);
        } else if (tipoPerfil == 'Avaliador') {
          this.router.navigate(['avaliador']);
        }
        localStorage.setItem('user', String(res.idUsuario));
      } else {
        this.msgalert = 'Usuário ou senha inválidos!';
      }

    }), (err: any) => {
      console.log(err);
    }
  }

}
