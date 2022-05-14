import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OficioService {
  private baseUrl = 'http://localhost:3000/oficio/';
  constructor(
    private http: HttpClient,
  ) { }

  cadastrarOficio(user: any) {
    return this.http.post(`${this.baseUrl}cadastrarOficio`, user);
  }
  buscarOficios() {
    return this.http.get(`${this.baseUrl}buscarOficios`);
  }
  deletarOficio(id: any) {
    return this.http.post(`${this.baseUrl}deletarOficio`, id);
  }
}
