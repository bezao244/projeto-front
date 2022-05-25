import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvaliadorService } from 'src/app/services/avaliador.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import { ItemService } from 'src/app/services/item.service';
import { OficioService } from 'src/app/services/oficio.service';
import Swal from 'sweetalert2';
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
  somaNotas: any;
  notasItens: any[] = [];
  contErr: number = 0;

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
      this.msgalert = '';
    });
  }

  avaliar(id: number) {
    this.idCandidatoAvaliar = id;
    this.abrirProva = true;
    var modal = {
      idCandidato: id
    }
    this.candidatoService.buscarDadosCandidato(modal).subscribe((res: any) => {
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
    this.router.navigate([`visualizarInfo/${this.idUsuarioLogado}`]);
  }

  fechar() {
    Swal.fire({
      icon: 'warning',
      title: 'Tem certeza que deseja fechar?',
      showCancelButton: true,
      confirmButtonColor: '#59b479',
      cancelButtonColor: '#e36e6e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Fechar'
    }).then((result) => {
      if (result.value) {
        this.abrirProva = false;
      }
    });
  }
  addNotaPorItem(idItem: number, peso: number) {
    var notaItem = parseInt(this.notaForm.value.notaItem) * peso;
    var modal = {
      idItem: idItem,
      notaItem: notaItem,
      idCandidato: this.idCandidatoAvaliar
    }
    this.notasItens.push(modal);
    this.somaNotas += notaItem;
  }
  salvar() {
    console.log(this.notasItens);
    if (this.notaForm.valid) {
      for (let i = 0; i < this.notasItens.length; i++) {
        this.itemService.adicionarNotaPorItem(this.notasItens[i]).subscribe((res: any) => {
          if (!res) {
            Swal.fire({
              icon: 'warning',
              title: 'Erro ao salvar avaliação certifique se não deixou nenhum campo em branco!',
              showConfirmButton: true,
            });
            this.contErr++;
          }
        });

      } if (this.contErr > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Erro ao adicionar notas!',
          showConfirmButton: true
        });
      } else {
        console.log('nenhum erro continucandoS')
        Swal.fire({
          icon: 'success',
          title: 'Notas adicionadas com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        var nota1 = parseInt(this.notaForm.value.nota1);
        var nota2 = parseInt(this.notaForm.value.nota2);
        var nota3 = parseInt(this.notaForm.value.nota3);
        var modalTrab = {
          notaSegTrab: nota1 + nota2 + nota3,
          idCandidato: this.idCandidatoAvaliar
        }
        console.log(modalTrab);
        this.itemService.adicionarNotaSegTrab(modalTrab).subscribe((res: any) => {
          if (res) {
            console.log('seg trab adc ok');
          }
        })

        var modal = {
          idCandidato: this.idCandidatoAvaliar
        }
        this.itemService.setFoiAvaliado(modal).subscribe((res: any) => {
          if (res) {
            console.log('foi avaliado true');
          }
        })
        this.abrirProva = false;
        this.listar();
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos de notas vazios!',
        showConfirmButton: true
      });
    }

  }

}
