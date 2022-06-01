import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AvaliadorService } from 'src/app/services/avaliador.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { OficioService } from 'src/app/services/oficio.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-dados',
  templateUrl: './editar-dados.component.html',
  styleUrls: ['./editar-dados.component.css']
})
export class EditarDadosComponent implements OnInit {
  @Input() public id: number;
  @Input() public tipoEditar: string;
  crudFormUsuario: FormGroup;
  crudFormCandidato: FormGroup;
  avaliadores: any[] = [];
  oficio: any[] = [];
  empresa: any[] = [];
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private candidatoService: CandidatoService,
    private oficioService: OficioService,
    private empresaService: EmpresaService,
    private avaliadorService: AvaliadorService
  ) { }

  ngOnInit(): void {
    this.listarDadosSelect();
    this.crudFormUsuario = this.formBuilder.group({
      email: [null],
      senha: [null]
    });
    this.crudFormCandidato = this.formBuilder.group({
      nome: [null],
      cpf: [null],
      idAvaliador: [null],
      idEmpresa: [null],
      idOficio: [null]
    });
    switch (this.tipoEditar) {
      case 'Usuario':
        let modal1 = {
          idUsuario: this.id
        }
        this.authService.buscarDadosUsuario(modal1).subscribe((res: any) => {
          this.crudFormUsuario.patchValue({
            email: res[0].email,
            senha: res[0].senha
          });
        });
        break;
      case 'Candidato':
        let modal2 = {
          idCandidato: this.id
        }
        this.candidatoService.buscarDadosCandidato(modal2).subscribe((res: any) => {
          this.crudFormCandidato.patchValue({
            nome: res[0].nome,
            cpf: res[0].cpf,
            idAvaliador: res[0].idAvaliador,
            idEmpresa: res[0].idEmpresa,
            idOficio: res[0].idOficio
          });
        });
        break;
    }
  }
  listarDadosSelect() {
    this.avaliadorService.buscarAvaliadores().subscribe((res: any) => {
      this.avaliadores = res;
    });
    this.oficioService.buscarOficios().subscribe((res: any) => {
      this.oficio = res;
    });
    this.empresaService.listarEmpresa().subscribe((res: any) => {
      this.empresa = res;
    })
  }
  close() {
    this.activeModal.close();
  }
  salvarUsuario() {
    var modal = {
      idUsuario: this.id,
      email: this.crudFormUsuario.value.email,
      senha: this.crudFormUsuario.value.senha
    }
    this.authService.editar(modal).subscribe((res: any) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          title: 'Dados alterados com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
    this.activeModal.close();
  }
  salvarCandidato() {
    this.activeModal.close();
  }
}
