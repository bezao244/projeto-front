import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvaliadorService } from 'src/app/services/avaliador.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-acessp',
  templateUrl: './crud-acessp.component.html',
  styleUrls: ['./crud-acessp.component.css']
})
export class CrudAcesspComponent implements OnInit {

  contas: any[] = [];
  crudForm: FormGroup;
  tipoConta: any = '';
  crudFormEmpresa: FormGroup;
  crudFormAdmin: FormGroup;
  crudFormAvaliador: FormGroup;

  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService,
    private avaliadorService: AvaliadorService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.crudForm = this.formBuilder.group({
      userName: [null, Validators.required],
      pass: [null, Validators.required],
      roleId: [null, Validators.required]
    });
    this.authService.buscarTipoConta().subscribe((res: any) => {
      this.contas = res;
      console.log(res);
    });

    this.crudForm = this.formBuilder.group({
      email: [null],
      senha: [null],
      tipoConta: [null]
    });

    this.crudFormEmpresa = this.formBuilder.group({
      nomeEmpresa: [null, Validators.required],
      cnpj: [null, Validators.required],
      razaoSocial: [null, Validators.required],
      dsLogradouro: [null, Validators.required],
      cep: [null, Validators.required],
      telResp: [null, Validators.required],
      telFixo: [null, Validators.required],
      nomeResp: [null, Validators.required],
      nmFantasia: [null, Validators.required]

    });

    this.crudFormAdmin = this.formBuilder.group({
      nome: [null, Validators.required]
    });

    this.crudFormAvaliador = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: [null, Validators.required]
    });

  }
  fechar() {
    this.router.navigate(['cad-acesso']);
  }
  avancar() {
    if (this.crudForm.valid) {
      this.tipoConta = this.crudForm.value.tipoConta;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Preencha todos os campos de Dados Básicos!',
        showConfirmButton: true,
      });
    }
  }
  cadastrarAdmin() {
    if (this.crudFormAdmin.valid) {
      var modal = {
        email: this.crudForm.value.email,
        senha: this.crudForm.value.senha,
        tipoPerfil: this.crudForm.value.tipoConta,
      }
      this.authService.create(modal).subscribe((res: any) => {
        const idUsuario = res[0].idUsuario;
        console.log(idUsuario);
        if (idUsuario != false) {
          var modal = {
            idUsuario: idUsuario,
            nome: this.crudFormAdmin.value.nome
          }
          this.authService.createAdmin(modal).subscribe((res: any) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Cadastro realizado com sucesso!',
              showConfirmButton: false,
              timer: 2000
            });
            setTimeout(() => {
              this.router.navigate(['cad-acesso']);
            }, 2000);
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Preencha todos os campos!',
        showConfirmButton: true,
      });
    }


  }
  cadastrarAvaliador() {
    if (this.crudFormAvaliador.valid) {
      var modal = {
        email: this.crudForm.value.email,
        senha: this.crudForm.value.senha,
        tipoPerfil: this.crudForm.value.tipoConta,
      }
      this.authService.create(modal).subscribe((res: any) => {
        const idUsuario = res[0].idUsuario;
        console.log(idUsuario);
        if (idUsuario != false) {
          var modal = {
            idUsuario: idUsuario,
            nome: this.crudFormAvaliador.value.nome,
            cpf: this.crudFormAvaliador.value.cpf
          }
          this.avaliadorService.createAvaliador(modal).subscribe((res: any) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Cadastro realizado com sucesso!',
              showConfirmButton: false,
              timer: 2000
            });
            setTimeout(() => {
              this.router.navigate(['cad-acesso']);
            }, 2000);
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Preencha todos os campos!',
        showConfirmButton: true,
      });
    }


  }
  cadastrarEmpresa() {
    if (this.crudFormEmpresa.valid) {
      var modal = {
        email: this.crudForm.value.email,
        senha: this.crudForm.value.senha,
        tipoPerfil: this.crudForm.value.tipoConta,
      }
      this.authService.create(modal).subscribe((res: any) => {
        const idUsuario = res[0].idUsuario;
        console.log(idUsuario);
        if (idUsuario != false) {
          var modal = {
            idUsuario: idUsuario,
            nomeEmpresa: this.crudFormEmpresa.value.nomeEmpresa,
            cnpj: this.crudFormEmpresa.value.cnpj,
            razaoSocial: this.crudFormEmpresa.value.razaoSocial,
            dsLogradouro: this.crudFormEmpresa.value.dsLogradouro,
            cep: this.crudFormEmpresa.value.cep,
            telResp: this.crudFormEmpresa.value.telResp,
            telFixo: this.crudFormEmpresa.value.telFixo,
            nomeResp: this.crudFormEmpresa.value.nomeResp,
            nmFantasia: this.crudFormEmpresa.value.nmFantasia
          }
          console.log(modal);
          this.empresaService.createEmpresa(modal).subscribe((res: any) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Cadastro realizado com sucesso!',
              showConfirmButton: false,
              timer: 2000
            });
            setTimeout(() => {
              this.router.navigate(['cad-acesso']);
            }, 2000);
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Preencha todos os campos!',
        showConfirmButton: true,
      });
    }
  }

  fecharCad(){
    this.router.navigate(['cad-acesso']);
  }
}
