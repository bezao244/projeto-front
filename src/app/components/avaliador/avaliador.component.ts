import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-avaliador',
  templateUrl: './avaliador.component.html',
  styleUrls: ['./avaliador.component.css']
})
export class AvaliadorComponent implements OnInit {

  candidatos: any[] = [];
  msgalert:any = '';
  filtrarForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {

    var infoId = {
      //idAvaliador: logica
    }

    this.authService.listarPorAvaliador(infoId).subscribe( (res:any)=>{
      this.candidatos = res;
      if(this.candidatos.length < 1){
        this.msgalert = 'Nenhum candidato para avaliar no momento!';
      }
    } );

    this.filtrarForm = this.formBuilder.group({
      userName: [null],
      oficio: [null],
      dataInclusao: [null]
    });
  }

  avaliar(id: any){
    //logica para abrir a avaliacao pelo id do candidato
  }
  
  filtrar(){
    var modal = {
      //idAvaliador: vai precisar tambem
      //logica de montar pelo filtrarForm
    }
    this.authService.filtrarAvaliador(modal).subscribe( (res:any)=>{
      this.candidatos = res;
      if(this.candidatos.length < 1){
        this.msgalert = 'Nenhum candidato corresponde com o filtro!';
      }
    } );
  }

}
