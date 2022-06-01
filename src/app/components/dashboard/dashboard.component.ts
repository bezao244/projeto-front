import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  idUsuarioLogado: number;
  nomeUsuario: string;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let getId: any = localStorage.getItem('user');
    this.idUsuarioLogado = parseInt(getId);
    console.log(this.idUsuarioLogado);

    var modal = {
      idUsuario: this.idUsuarioLogado
    }
    this.authService.buscarDadosUsuario(modal).subscribe((res: any) => {
      this.nomeUsuario = res[0].email;
    });
  }

}
