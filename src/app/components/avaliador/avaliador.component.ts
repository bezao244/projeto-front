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
  idUsuarioLogado: any;
  oficio: any[] = [];

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

    this.authService.listarPorAvaliador(modal).subscribe( (res:any)=>{
      this.candidatos = res;
      if(this.candidatos.length < 1){
        this.msgalert = 'Nenhum candidato para avaliar no momento!';
      }
    } );

    this.authService.buscarOficios().subscribe( (res:any)=>{
      this.oficio = res;
    } );

    this.filtrarForm = this.formBuilder.group({
      nome: [null],
      cpf: [null],
      oficio: [null]
    });
  }

  avaliar(id: any){
    //logica para abrir a avaliacao pelo id do candidato
  }
  
  filtrar(){
    var modal = {
      idAvaliador: this.idUsuarioLogado
      //logica de montar pelo filtrarForm
    }
    this.authService.filtrarAvaliador(modal).subscribe( (res:any)=>{
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
