import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import Swal from 'sweetalert2';
import { EditarDadosComponent } from '../editar-dados/editar-dados.component';

@Component({
  selector: 'app-cad-acesso',
  templateUrl: './cad-acesso.component.html',
  styleUrls: ['./cad-acesso.component.css']
})
export class CadAcessoComponent implements OnInit {

  msgalert: any = '';
  pessoas: any[] = [];
  pesquisarForm: FormGroup;
  idUsuarioLogado: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.listar();
    this.pesquisarForm = this.formBuilder.group({
      email: [null]
    });
    let getId: any = localStorage.getItem('user');
    this.idUsuarioLogado = parseInt(getId);
    console.log(this.idUsuarioLogado);
  }
  listar() {
    this.authService.listar().subscribe((res: any) => {
      this.pessoas = res;
      if (this.pessoas.length < 1) {
        this.msgalert = 'Nenhum acesso cadastrado!';
      }
    });
  }
  pesquisar() {
    var modal = {
      parametro: this.pesquisarForm.value.email
    }
    this.authService.filtrar(modal).subscribe((res: any) => {
      if (res != false) {
        this.pessoas = res;
        if (this.pessoas.length < 1) {
          this.msgalert = 'Nenhum usuário corresponde com o filtro!';
        }
      } else {
        console.log('erro ao filtrar!');
      }

    });
  }
  abrirCadastro() {
    this.router.navigate(['crud-acesso']);
  }
  voltar() {
    this.router.navigate(['admin']);
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
          idUsuario: id
        }
        this.authService.deletar(modal).subscribe((res: any) => {
          if (res == true) {
            Swal.fire({
              icon: 'success',
              title: 'Usuário deletado com sucesso!',
              showConfirmButton: false,
              timer: 2000
            });
            this.listar();
          }
        });
      } else {
        return;
      }
    });
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
    modalRef.componentInstance.tipoEditar = 'Usuario';
  }
}
