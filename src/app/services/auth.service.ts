import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl =  'http://localhost:3000/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }

  singin(user: any){
    return this.http.post(`${this.baseUrl}user/singin`, user);
  }
  buscarTipoConta(){
    return this.http.get(`${this.baseUrl}user/buscarTipoConta`);
  }
  buscarOficios(){
    return this.http.get(`${this.baseUrl}oficio/buscarOficios`);
  }
  buscarNomeEmpresa(id: any){
    return this.http.post(`${this.baseUrl}user/buscarNomeEmpresa`, id);
  }
  buscarAvaliadores(){
    return this.http.get(`${this.baseUrl}user/buscarAvaliadores`);
  }
  listar(){
    return this.http.get(`${this.baseUrl}user`);
  }
  listarPorNome(user: any){
    return this.http.post(`${this.baseUrl}user/filtrarPorNome`, user);
  }
  listarPorEmpresa(id: any){
    return this.http.post(`${this.baseUrl}user/listarPorEmpresa`, id);
  }
  listarPorAvaliador(id:any){
    return this.http.post(`${this.baseUrl}user/listarPorAvaliador`, id);
  }
  filtrarAvaliador(user: any){
    return this.http.post(`${this.baseUrl}user/filtrarAvaliador`, user);
  }
  filtrarEmpresa(user: any){
    return this.http.post(`${this.baseUrl}user/filtrarEmpresa`, user);
  }
  deletar(id:any){
    return this.http.post(`${this.baseUrl}user/deletar`, id);
  }
  deletarOficio(id:any){
    return this.http.post(`${this.baseUrl}oficio/deletarOficio`, id);
  }
  create(user: any){
    console.log(user);
    return this.http.post(`${this.baseUrl}user/create`, user);
  }
  createAdmin(user:any){
    return this.http.post(`${this.baseUrl}user/createAdmin`, user);
  }
  createAvaliador(user:any){
    return this.http.post(`${this.baseUrl}user/createAvaliador`, user);
  }
  createEmpresa(user:any){
    return this.http.post(`${this.baseUrl}user/createEmpresa`, user);
  }
  cadastrarOficio(user:any){
    return this.http.post(`${this.baseUrl}oficio/cadastrarOficio`, user);
  }
  // isAuth():boolean{
  //   const token = JSON.parse(localStorage.getItem('token')!);
    
  //   if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
  //     return false;
  //   }
  //   return true;
  // }
}
