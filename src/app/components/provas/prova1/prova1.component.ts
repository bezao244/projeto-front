import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CandidatoService } from 'src/app/services/candidato.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-prova1',
  templateUrl: './prova1.component.html',
  styleUrls: ['./prova1.component.css']
})
export class Prova1Component implements OnInit {

  @Input() idCandidato: number;
  candidatos: any[] = [];
  notaForm: FormGroup;
  constructor(
    private candidatoService: CandidatoService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    var modal = {
      idCandidato: this.idCandidato
    }
    this.candidatoService.buscarDadosCandidato(modal).subscribe((res: any) => {
      this.candidatos = res;
    });
    this.notaForm = this.formBuilder.group({
      nota1: [null]
    })
  }
  salvar() {

  }
  fechar() {
    Swal.fire({
      icon: 'warning',
      title: 'Tem certeza que deseja fechar a avaliação?',
      text: ' Os dados não serão salvos!',
      showConfirmButton: true,
      showCancelButton: true
    });
  }

}
