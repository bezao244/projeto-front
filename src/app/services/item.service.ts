import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:3000/item/';
  constructor(
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get(`${this.baseUrl}listar`);
  }

  create(user: any) {
    return this.http.post(`${this.baseUrl}create`, user);
  }
  deletar(id: any) {
    return this.http.post(`${this.baseUrl}deletar`, id);
  }
  buscarQuestoesProva(user: any) {
    return this.http.post(`${this.baseUrl}buscarQuestoesProva`, user);
  }
  adicionarNotaPorItem(modal: any) {
    return this.http.post(`${this.baseUrl}adicionarNotaPorItem`, modal);
  }
  adicionarNotaSegTrab(modal: any) {
    return this.http.post(`${this.baseUrl}adicionarNotaSegTrab`, modal);
  }
  setFoiAvaliado(modal: any) {
    return this.http.post(`${this.baseUrl}setAvaliado`, modal);
  }
}
