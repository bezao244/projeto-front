import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatoService } from 'src/app/services/candidato.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cad-nota',
  templateUrl: './cad-nota.component.html',
  styleUrls: ['./cad-nota.component.css']
})
export class CadNotaComponent implements OnInit {

  pessoas: any[] = [];
  pesquisarForm: FormGroup;
  msgalert: any = '';
  msgalertNota: any = '';
  abrirCadastroNota: boolean = false;
  candidatoNota: any[] = [];
  crudFormNota: FormGroup;

  constructor(
    private candidatoServive: CandidatoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listar();

    this.pesquisarForm = this.formBuilder.group({
      nome: [null],
      cpf: [null]
    });
    this.crudFormNota = this.formBuilder.group({
      notaFinal: [null, Validators.required]
    });

  }
  listar() {
    this.candidatoServive.listarSemNota().subscribe((res: any) => {
      this.pessoas = res;
      console.log(res); if (this.pessoas.length < 1) {
        this.msgalert = 'Nenhum candidato com nota pendente!';
      }
    });

  }
  pesquisar() {
    var modal = {
      nome: this.pesquisarForm.value.nome,
      cpf: this.pesquisarForm.value.cpf
    }
    this.candidatoServive.filtrarSemNota(modal).subscribe((res: any) => {
      this.pessoas = res;
      if (this.pessoas.length < 1) {
        this.msgalert = 'Nenhum candidato corresponde com o filtro!';
      }
    });
  }
  adicionar(id: any) {
    var modal = {
      idCandidato: id
    }
    this.candidatoServive.buscarDadosCandidato(modal).subscribe((res: any) => {
      this.candidatoNota = res;
      this.abrirCadastroNota = true;
    });

  }
  adicionarNota(id: any) {
    if (this.crudFormNota.valid) {
      if (this.crudFormNota.value.notaFinal > 10) {
        this.msgalertNota = 'Nota somente de 0 a 10!';
      } else {
        var modal = {
          notaFinal: this.crudFormNota.value.notaFinal,
          idCandidato: id
        }
        this.candidatoServive.adicionarNotaCandidato(modal).subscribe((res: any) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Nota adicionada com sucesso!',
              showConfirmButton: false,
              timer: 2000
            });
            this.listar();
            this.abrirCadastroNota = false;
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Erro ao adicionar nota, tente novamente!',
              showConfirmButton: true
            });
          }
        })
      }

    } else {
      this.msgalertNota = 'Preencha o campo de nota!';
    }
  }
  voltar() {
    this.router.navigate(['admin']);
  }
}
