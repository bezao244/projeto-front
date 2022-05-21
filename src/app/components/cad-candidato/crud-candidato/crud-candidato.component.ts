import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvaliadorService } from 'src/app/services/avaliador.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { OficioService } from 'src/app/services/oficio.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crud-candidato',
  templateUrl: './crud-candidato.component.html',
  styleUrls: ['./crud-candidato.component.css']
})
export class CrudCandidatoComponent implements OnInit {

  crudFormCandidato: FormGroup;
  avaliadores: any[] = [];
  oficios: any[] = [];
  empresas: any[] = [];

  constructor(
    private authService: AuthService,
    private candidatoService: CandidatoService,
    private oficioService: OficioService,
    private avaliadorService: AvaliadorService,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crudFormCandidato = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      idAvaliador: [null, Validators.required],
      idOficio: [null, Validators.required],
      idEmpresa: [null, Validators.required]
    });
    this.avaliadorService.buscarAvaliadores().subscribe((res: any) => {
      this.avaliadores = res;
    });
    this.oficioService.buscarOficios().subscribe((res: any) => {
      this.oficios = res;
    });
    this.empresaService.listarEmpresa().subscribe((res: any) => {
      this.empresas = res;
    })
  }
  cadastrar() {
    if (this.crudFormCandidato.valid) {
      var modal = {
        nome: this.crudFormCandidato.value.nome,
        cpf: this.crudFormCandidato.value.cpf,
        idAvaliador: this.crudFormCandidato.value.idAvaliador,
        idEmpresa: this.crudFormCandidato.value.idEmpresa,
        idOficio: this.crudFormCandidato.value.idOficio
      }
      console.log(modal);
      this.candidatoService.createCandidato(modal).subscribe((res: any) => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(() => {
            this.router.navigate(['cad-candidato']);
          }, 2000);
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
  fecharCad() {
    this.router.navigate(['cad-candidato']);
  }
}
