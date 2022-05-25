import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  singin(user: any) {
    return this.http.post(`${this.baseUrl}user/singin`, user);
  }
  buscarTipoConta() {
    return this.http.get(`${this.baseUrl}user/buscarTipoConta`);
  }
  filtrar(user: any) {
    return this.http.post(`${this.baseUrl}user/filtrar`, user);
  }
  listar() {
    return this.http.get(`${this.baseUrl}user`);
  }
  buscarDadosUsuario(user: any) {
    return this.http.post(`${this.baseUrl}user/buscarDadosUsuario`, user);
  }
  deletar(id: any) {
    return this.http.post(`${this.baseUrl}user/deletar`, id);
  }
  create(user: any) {
    console.log(user);
    return this.http.post(`${this.baseUrl}user/create`, user);
  }
  createAdmin(user: any) {
    return this.http.post(`${this.baseUrl}user/createAdmin`, user);
  }
  buscarDadosAvaliador(id: any) {
    return this.http.post(`${this.baseUrl}user/buscarDadosAvaliador`, id);
  }
  buscarDadosEmpresa(id: any) {
    return this.http.post(`${this.baseUrl}user/buscarDadosEmpresa`, id);
  }
  buscarDadosAdiminstrador(id: any) {
    return this.http.post(`${this.baseUrl}user/buscarDadosAdiminstrador`, id);
  }

  // isAuth():boolean{
  //   const token = JSON.parse(localStorage.getItem('token')!);

  //   if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
  //     return false;
  //   }
  //   return true;
  // }
}
