import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { OficioService } from 'src/app/services/oficio.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  candidatos: any[] = [];
  msgalert: any = '';
  filtrarForm: FormGroup;
  nomeEmpresa: any = '';
  idUsuarioLogado: number;
  oficios: any[] = [];
  idEmpresa: number;
  width: any;
  abrirDetalhes: boolean = false;
  detalhescandidato: any[] = [];

  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService,
    private oficioService: OficioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    let getId: any = localStorage.getItem('user');
    this.idUsuarioLogado = parseInt(getId);
    console.log(this.idUsuarioLogado);

    this.width = window.screen.width;
    console.log('Width da tela', this.width);

    this.buscarNomeEmpresa();
    this.listar();

    this.oficioService.buscarOficios().subscribe((res: any) => {
      this.oficios = res;
    })

    this.filtrarForm = this.formBuilder.group({
      nome: [null],
      oficio: [null],
      dataInclusao: [null]
    });

  }
  buscarNomeEmpresa() {
    var modalId = {
      idUsuario: this.idUsuarioLogado
    }
    this.empresaService.buscarNomeEmpresa(modalId).subscribe((res: any) => {
      this.idEmpresa = res.idEmpresa;
      this.nomeEmpresa = res.nomeEmpresa;
    });
  }
  listar() {
    var modal = {
      idUsuario: this.idUsuarioLogado
    }
    this.empresaService.listarPorEmpresa(modal).subscribe((res: any) => {
      this.candidatos = res;
      if (this.candidatos.length < 1) {
        this.msgalert = 'Nenhum candidato afiliado a essa empresa foi avaliado!';
      }
    });
  }
  filtrar() {
    var modal = {
      idEmpresa: this.idUsuarioLogado,
      nome: this.filtrarForm.value.nome,
      oficio: this.filtrarForm.value.oficio,
      dataInclusao: this.filtrarForm.value.dataInclusao
    }
    this.empresaService.filtrarEmpresa(modal).subscribe((res: any) => {
      this.candidatos = res;
      if (this.candidatos.length < 1) {
        this.msgalert = 'Nenhum candidato corresponde com o filtro!';
      }
    });
  }

  logout() {
    this.router.navigate(['home']);
  }

  abrirRelatorio(id: number) {
    var modal = {
      idCandidato: id
    }
    this.empresaService.buscarDadosNotaCandidato(modal).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.detalhescandidato = res;
      } else {
        console.log('impossivel encontrar notas desse candidato');
      }
    });
    this.abrirDetalhes = true;
  }

  fecharDetalhes() {
    this.abrirDetalhes = false;
  }
}
