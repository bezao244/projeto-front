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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {

    var infoId = {
      //idAvaliador: logica
    }

    //logica para pegar o nome da empresa para ser exibido na navbar
    //this.nomeEmpresa = ;

    this.authService.listarPorEmpresa(infoId).subscribe( (res:any)=>{
      this.candidatos = res;
      if(this.candidatos.length < 1){
        this.msgalert = 'Nenhum candidato afiliados a essa empresa avaliados!';
      }
    } );

    // this.filtrarForm = this.formBuilder.group({
    //   userName: [null],
    //   oficio: [null],
    //   dataInclusao: [null]
    // });

  }

  filtrar(){
    var modal = {
      //idEmpresa: vai precisar tambem
      //logica de montar pelo filtrarForm
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
