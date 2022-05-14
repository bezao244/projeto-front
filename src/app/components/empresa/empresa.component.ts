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

    this.buscarNomeEmpresa();
    this.listar();

    this.oficioService.buscarOficios().subscribe((res: any) => {
      this.oficios = res;
    })

    this.filtrarForm = this.formBuilder.group({
      userName: [null],
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
        this.msgalert = 'Nenhum candidato afiliados a essa empresav !';
      }
    });
  }
  filtrar() {
    var modal = {
      idEmpresa: this.idUsuarioLogado
      //restante dos campos de filtro
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

}
