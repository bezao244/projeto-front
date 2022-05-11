import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  candidatos: any[] = [];
  msgalert:any = '';
  filtrarForm: FormGroup;
  nomeEmpresa: any = '';
  idUsuarioLogado: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    let getId: any = localStorage.getItem('user');
    this.idUsuarioLogado = parseInt(getId);
    console.log(this.idUsuarioLogado);

    var modal ={
      idAvaliador: this.idUsuarioLogado
    }
    var modalId = {
      idUsuario: this.idUsuarioLogado
    }
    this.authService.buscarNomeEmpresa(modalId).subscribe( (res: any)=>{
      console.log(res);
      this.nomeEmpresa = res.nomeEmpresa;
    } );

    this.authService.listarPorEmpresa(modal).subscribe( (res:any)=>{
      this.candidatos = res;
      if(this.candidatos.length < 1){
        this.msgalert = 'Nenhum candidato afiliados a essa empresa avaliados!';
      }
    } );

    this.filtrarForm = this.formBuilder.group({
      userName: [null],
      oficio: [null],
      dataInclusao: [null]
    });

  }

  filtrar(){
    var modal = {
      idEmpresa: this.idUsuarioLogado
      //restante dos campos de filtro
    }
    this.authService.filtrarEmpresa(modal).subscribe( (res:any)=>{
      this.candidatos = res;
      if(this.candidatos.length < 1){
        this.msgalert = 'Nenhum candidato corresponde com o filtro!';
      }
    } );
  }

  logout(){
    this.router.navigate(['home']);
  }

}
