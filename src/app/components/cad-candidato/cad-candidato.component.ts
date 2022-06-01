import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CandidatoService } from 'src/app/services/candidato.service';
import Swal from 'sweetalert2';
import { EditarDadosComponent } from '../editar-dados/editar-dados.component';
@Component({
  selector: 'app-cad-candidato',
  templateUrl: './cad-candidato.component.html',
  styleUrls: ['./cad-candidato.component.css']
})
export class CadCandidatoComponent implements OnInit {

  msgalert: any = '';
  candidatos: any[] = [];
  pesquisarForm: FormGroup;

  constructor(
    private candidatoService: CandidatoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.listar();
    this.pesquisarForm = this.formBuilder.group({
      nome: [null]
    });
  }
  listar() {
    this.msgalert = '';
    this.candidatoService.listarCandidatos().subscribe((res: any) => {
      this.candidatos = res;
      if (this.candidatos.length < 1) {
        this.msgalert = 'Nenhum candidato cadastrado!';
      }
    });
  }
  pesquisar() {
    var modal = {
      nome: this.pesquisarForm.value.nome
    }
    this.candidatoService.filtrar(modal).subscribe((res: any) => {
      this.candidatos = res;
      if (this.candidatos.length < 1) {
        this.msgalert = 'Nenhum candidato encontrado!';
      }
    });
  }
  abrirCadastro() {
    this.router.navigate(['crud-candidato']);
  }
  voltar() {
    this.router.navigate(['admin']);
  }
  editar(id: any) {
    let options: NgbModalOptions = {
      centered: false,
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      backdropClass: "modal-backdrop"
    };
    const modalRef = this.modalService.open(EditarDadosComponent, options);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.tipoEditar = 'Candidato';
  }
  deletar(id: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Tem certeza que deseja excluir?',
      showCancelButton: true,
      confirmButtonColor: '#59b479',
      cancelButtonColor: '#e36e6e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Excluir'
    }).then((result) => {
      if (result.value) {
        var modal = {
          idCandidato: id
        }
        this.candidatoService.deletarCandidato(modal).subscribe((res: any) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Candidato deletado com sucesso!',
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
        this.listar();
      } else {
        return;
      }
    });
  }
}
