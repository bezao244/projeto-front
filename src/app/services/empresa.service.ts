import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = 'http://localhost:3000/empresa/';
  constructor(
    private http: HttpClient,
  ) { }

  buscarNomeEmpresa(id: any) {
    return this.http.post(`${this.baseUrl}buscarNomeEmpresa`, id);
  }
  filtrarEmpresa(user: any) {
    return this.http.post(`${this.baseUrl}filtrarEmpresa`, user);
  }
  listarPorEmpresa(id: any) {
    return this.http.post(`${this.baseUrl}listarPorEmpresa`, id);
  }
  createEmpresa(user: any) {
    return this.http.post(`${this.baseUrl}createEmpresa`, user);
  }
}
