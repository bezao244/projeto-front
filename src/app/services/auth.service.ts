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
  buscarDadosCandidato(id: any){
    return this.http.post(`${this.baseUrl}user/buscarDadosCandidato`, id);
  }
  listar(){
    return this.http.get(`${this.baseUrl}user`);
  }
  listarPorNome(user: any){
    return this.http.post(`${this.baseUrl}user/filtrarPorNome`, user);
  }
  listarCandidatos(){
    return this.http.get(`${this.baseUrl}user/listarCandidatos`);
  }
  listarSemNota(){
    return this.http.get(`${this.baseUrl}user/filtrarPorNota`);
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
  deletarCandidato(id:any){
    return this.http.post(`${this.baseUrl}user/deletarCandidato`, id);
  }
  deletarOficio(id:any){
    return this.http.post(`${this.baseUrl}oficio/deletarOficio`, id);
  }
  adicionarNotaCandidato(user: any){
    return this.http.post(`${this.baseUrl}user/adicionarNotaCandidato`, user);
  }
  // isAuth():boolean{
  //   const token = JSON.parse(localStorage.getItem('token')!);
    
  //   if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
  //     return false;
  //   }
  //   return true;
  // }

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
  createCandidato(user:any){
    return this.http.post(`${this.baseUrl}user/createCandidato`, user);
  }
  cadastrarOficio(user:any){
    return this.http.post(`${this.baseUrl}oficio/cadastrarOficio`, user);
  }
  
}
