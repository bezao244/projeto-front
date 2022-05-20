import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { OficioService } from 'src/app/services/oficio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-item',
  templateUrl: './crud-item.component.html',
  styleUrls: ['./crud-item.component.css']
})
export class CrudItemComponent implements OnInit {

  crudForm: FormGroup;
  oficios: any[] = [];

  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private router: Router,
    private oficioService: OficioService
  ) { }

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      descricao: [null, Validators.required],
      oficio: [null, Validators.required]
    });
    this.oficioService.buscarOficios().subscribe((res: any) => {
      this.oficios = res;
    });

  }

  cadastrar() {
    var modal = {
      idOficio: this.crudForm.value.oficio,
      descricao: this.crudForm.value.descricao
    }
    console.log(modal);
    this.itemService.create(modal).subscribe((res: any) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          this.router.navigate(['cad-item']);
        }, 2000);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Erro ao cadastrar!',
          text: 'Certifique se não há campos vazios',
          showConfirmButton: true
        });
      }
    });
  }
  fecharCad() {
    this.router.navigate(['cad-item']);
  }

}
