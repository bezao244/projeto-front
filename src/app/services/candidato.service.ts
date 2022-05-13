import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private baseUrl =  'http://localhost:3000/candidato/';
  constructor(
    private http: HttpClient,
  ) { }

  buscarDadosCandidato(id: any){
    return this.http.post(`${this.baseUrl}buscarDadosCandidato`, id);
  }
  listarCandidatos(){
    return this.http.get(`${this.baseUrl}listarCandidatos`);
  }
  listarSemNota(){
    return this.http.get(`${this.baseUrl}filtrarPorNota`);
  }
  adicionarNotaCandidato(user: any){
    return this.http.post(`${this.baseUrl}user/adicionarNotaCandidato`, user);
  }
  createCandidato(user:any){
    return this.http.post(`${this.baseUrl}user/createCandidato`, user);
  }
  deletarCandidato(id:any){
    return this.http.post(`${this.baseUrl}user/deletarCandidato`, id);
  }

}
