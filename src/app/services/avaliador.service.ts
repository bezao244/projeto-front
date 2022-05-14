import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvaliadorService {

  private baseUrl = 'http://localhost:3000/avaliador/';
  constructor(
    private http: HttpClient,
  ) { }

  buscarAvaliadores() {
    return this.http.get(`${this.baseUrl}buscarAvaliadores`);
  }
  listarPorAvaliador(id: any) {
    return this.http.post(`${this.baseUrl}listarPorAvaliador`, id);
  }
  filtrarAvaliador(user: any) {
    return this.http.post(`${this.baseUrl}filtrarAvaliador`, user);
  }
  createAvaliador(user: any) {
    return this.http.post(`${this.baseUrl}createAvaliador`, user);
  }
}
