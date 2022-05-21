import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvaliadorService } from 'src/app/services/avaliador.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import { ItemService } from 'src/app/services/item.service';
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
  abrirConfig: boolean = false;
  avaliadorLogado: any[] = [];
  notaForm: FormGroup;
  candidatoSelecionado: any[] = [];
  questoesProva: any[] = [];
  idOficioCandidatoAvaliar: number;
  somaNotas: number;
  notasItens: any[] = [];

  constructor(
    private oficioService: OficioService,
    private avaliadorService: AvaliadorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private candidatoService: CandidatoService,
    private itemService: ItemService
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

    this.notaForm = this.formBuilder.group({
      nota1: [null, Validators.required],
      nota2: [null, Validators.required],
      nota3: [null, Validators.required],
      notaItem: [null, Validators.required]
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
    var modal = {
      idCandidato: id
    }
    this.candidatoService.buscarDadosCandidato(modal).subscribe((res: any) => {
      console.log(res);
      this.candidatoSelecionado = res;
      this.idOficioCandidatoAvaliar = res[0].idOficio;
      this.buscarQuestoesProva();
    });

  }
  buscarQuestoesProva() {
    var modalProva = {
      idOficio: this.idOficioCandidatoAvaliar
    }
    this.itemService.buscarQuestoesProva(modalProva).subscribe((res: any) => {
      this.questoesProva = res;
    });
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
      this.avaliadorService.filtrarAvaliador(modal).subscribe((res: any) => {
        this.candidatos = res;
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
  abrirInfo() {
    var modal = {
      idUsuario: this.idUsuarioLogado
    }
    this.avaliadorService.buscarIdAvaliador(modal).subscribe((res: any) => {
      if (res != false) {
        this.avaliadorLogado = res;
      }
    });
    this.abrirConfig = true;
  }
  salvar() {
    // var modal = {
    //   nota1: this.notaForm.value.nota1,
    //   nota2: this.notaForm.value.nota2,
    //   nota3: this.notaForm.value.nota3,
    // }
    // console.log(modal);
    console.log(this.notasItens);
  }
  fechar() {
    // Swal.fire({
    //   icon: 'warning',
    //   title: 'Tem certeza que deseja fechar a avaliação?',
    //   text: ' Os dados não serão salvos!',
    //   showConfirmButton: true,
    //   showCancelButton: true
    // });
    this.abrirProva = false;
  }
  addNotaPorItem(idItem: number) {
    console.log(idItem);
    var notaItem = this.notaForm.value.notaItem;
    this.notasItens.push(notaItem);
  }

}
