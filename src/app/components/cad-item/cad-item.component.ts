import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cad-item',
  templateUrl: './cad-item.component.html',
  styleUrls: ['./cad-item.component.css']
})
export class CadItemComponent implements OnInit {

  msgalert: any = '';
  itens: any[] = [];
  pesquisarForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.pesquisarForm = this.formBuilder.group({
      oficio: [null],
    });
    this.listar();
  }
  listar() {
    this.itemService.listar().subscribe((res: any) => {
      this.itens = res;
      if (this.itens.length < 1) {
        this.msgalert = 'Nenhum item cadastrado!';
      }
    });
  }
  pesquisar() {

  }
  abrirCadastro() {
    this.router.navigate(['crud-item']);
  }
  editar(id: any) {

  }
  deletar(id: any) {

    Swal.fire({
      icon: 'warning',
      title: 'Tem certeza que deseja excluir?',
      showCancelButton: true,
      confirmButtonColor: '#59b479',
      cancelButtonColor: '#e36e6e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Excluir'
    }).then((result) => {
      if (result.value) {
        var modal = {
          idItem: id
        }
        this.itemService.deletar(modal).subscribe((res: any) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Item deletado com sucesso!',
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
        this.listar();
      } else {
        return;
      }
    });
  }

}
