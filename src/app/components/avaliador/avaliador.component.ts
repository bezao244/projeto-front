import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvaliadorService } from 'src/app/services/avaliador.service';
import { OficioService } from 'src/app/services/oficio.service';

@Component({
  selector: 'app-avaliador',
  templateUrl: './avaliador.component.html',
  styleUrls: ['./avaliador.component.css']
})
export class AvaliadorComponent implements OnInit {

  candidatos: any[] = [];
  msgalert: any = '';
  filtrarForm: FormGroup;
  idUsuarioLogado: any;
  oficio: any[] = [];
  idAvaliador: number;

  constructor(
    private authService: AuthService,
    private oficioService: OficioService,
    private avaliadorService: AvaliadorService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    let getId: any = localStorage.getItem('user');
    this.idUsuarioLogado = parseInt(getId);
    console.log(this.idUsuarioLogado);

    this.listar();

    this.oficioService.buscarOficios().subscribe((res: any) => {
      this.oficio = res;
    });

    this.filtrarForm = this.formBuilder.group({
      nome: [null],
      cpf: [null],
      oficio: [null]
    });
  }
  listar() {
    var modal = {
      idUsuario: this.idUsuarioLogado
    }
    this.avaliadorService.buscarIdAvaliador(modal).subscribe((res: any) => {
      this.idAvaliador = res.idAvaliador;
    });
    var modalId = {
      idAvaliador: this.idAvaliador
    }

    this.avaliadorService.listarPorAvaliador(modalId).subscribe((res: any) => {
      this.candidatos = res;
      if (this.candidatos.length < 1) {
        this.msgalert = 'Nenhum candidato para avaliar no momento!';
      }
    });
  }

  avaliar(id: any) {
    //logica para abrir a avaliacao pelo id do candidato
  }

  filtrar() {
    var modal = {
      idAvaliador: this.idUsuarioLogado
      //logica de montar pelo filtrarForm
    }
    this.avaliadorService.filtrarAvaliador(modal).subscribe((res: any) => {
      this.candidatos = res;
      if (this.candidatos.length < 1) {
        this.msgalert = 'Nenhum candidato corresponde com o filtro!';
      }
    });
  }
  logout() {
    this.router.navigate(['home']);
  }

}
