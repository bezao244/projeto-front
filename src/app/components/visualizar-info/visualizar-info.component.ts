import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-visualizar-info',
  templateUrl: './visualizar-info.component.html',
  styleUrls: ['./visualizar-info.component.css']
})
export class VisualizarInfoComponent implements OnInit {

  idUsuario: number;
  usuario: any[] = [];
  tipoConta: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.idUsuario = parseInt(
      this._activatedRoute.snapshot.params.idUsuario,
      10
    );
    var modal = {
      idUsuario: this.idUsuario
    }
    this.authService.buscarDadosUsuario(modal).subscribe((res: any) => {
      this.tipoConta = res[0].tipoPerfil;
      if (this.tipoConta == 'Administrador') {
        this.buscarDadosAdiminstrador(this.idUsuario);
      }
      if (this.tipoConta == 'Avaliador') {
        this.buscarDadosAvaliador(this.idUsuario);
      }
      if (this.tipoConta == 'Empresa') {
        this.buscarDadosEmpresa(this.idUsuario);
      }
      console.log(this.tipoConta);
    });
  }
  buscarDadosAvaliador(id: any) {
    var modal = {
      idUsuario: id
    }
    this.authService.buscarDadosAvaliador(modal).subscribe((res: any) => {
      console.log(res);
      this.usuario = res;
    });
  }
  buscarDadosEmpresa(id: any) {
    var modal = {
      idUsuario: id
    }
    this.authService.buscarDadosEmpresa(modal).subscribe((res: any) => {
      this.usuario = res;
    });
  }
  buscarDadosAdiminstrador(id: any) {
    var modal = {
      idUsuario: id
    }
    this.authService.buscarDadosAdiminstrador(modal).subscribe((res: any) => {
      this.usuario = res;
    });
  }

}
