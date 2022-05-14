import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvaliadorService } from 'src/app/services/avaliador.service';
import { CandidatoService } from 'src/app/services/candidato.service';
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

  constructor(
    private authService: AuthService,
    private candidatoService: CandidatoService,
    private oficioService: OficioService,
    private avaliadorService: AvaliadorService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crudFormCandidato = this.formBuilder.group({
      nome: [null],
      cpf: [null],
      idAvaliador: [null],
      oficio: [null]
    });
    this.avaliadorService.buscarAvaliadores().subscribe((res: any) => {
      this.avaliadores = res;
    });
    this.oficioService.buscarOficios().subscribe((res: any) => {
      this.oficios = res;
    });
  }
  cadastrar() {
    var modal = {
      nome: this.crudFormCandidato.value.nome,
      cpf: this.crudFormCandidato.value.cpf,
      idAvaliador: this.crudFormCandidato.value.idAvaliador,
      oficio: this.crudFormCandidato.value.oficio
    }
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
  }
}
