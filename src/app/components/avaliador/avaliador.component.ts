import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvaliadorService } from 'src/app/services/avaliador.service';
import { OficioService } from 'src/app/services/oficio.service';
import Swal from 'sweetalert2';
import { Prova1Component } from '../provas/prova1/prova1.component';
@Component({
  selector: 'app-avaliador',
  templateUrl: './avaliador.component.html',
  styleUrls: ['./avaliador.component.css']
})
export class AvaliadorComponent implements OnInit {

  candidatos: any[] = [];
  msgalert: any = '';
  msgalertFiltro: any = '';
  filtrarForm: FormGroup;
  idUsuarioLogado: any;
  oficios: any[] = [];
  idAvaliador: number;
  abrirProva: boolean = false;
  idCandidatoAvaliar: number;

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
      this.oficios = res;
    });

    this.filtrarForm = this.formBuilder.group({
      nome: [null],
      oficio: [null],
      dataInclusao: [null]
    });
  }
  listar() {
    var modal = {
      idUsuario: this.idUsuarioLogado
    }
    this.avaliadorService.listarPorAvaliador(modal).subscribe((res: any) => {
      this.candidatos = res;
      if (this.candidatos.length < 1) {
        this.msgalert = 'Nenhum candidato para avaliar no momento!';
      }
    });
  }

  avaliar(id: number) {
    this.idCandidatoAvaliar = id;
    this.abrirProva = true;
  }

  filtrar() {
    if (this.filtrarForm.value.nome != null || this.filtrarForm.value.oficio != null) {
      this.msgalertFiltro = '';
      var modal = {
        idAvaliador: this.idUsuarioLogado,
        nome: this.filtrarForm.value.nome,
        oficio: this.filtrarForm.value.oficio,
        dataInclusao: this.filtrarForm.value.dataInclusao
      }
      console.log(modal);
      this.avaliadorService.filtrarAvaliador(modal).subscribe((res: any) => {
        this.candidatos = res;
        console.log(res);
        if (this.candidatos.length < 1) {
          this.msgalert = 'Nenhum candidato corresponde com o filtro!';
        }
      });
    } else {
      this.msgalertFiltro = 'Preencha os campos do filtro!';
    }

  }
  logout() {
    this.router.navigate(['home']);
  }

}
