import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OficioService } from 'src/app/services/oficio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-oficio',
  templateUrl: './crud-oficio.component.html',
  styleUrls: ['./crud-oficio.component.css']
})
export class CrudOficioComponent implements OnInit {
  crudForm: FormGroup;
  constructor(
    private authService: AuthService,
    private oficioService: OficioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      oficio: [null]
    });
  }
  cadastrar() {
    var modal = {
      oficio: this.crudForm.value.oficio
    }
    this.oficioService.cadastrarOficio(modal).subscribe((res: any) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          this.router.navigate(['cad-oficio']);
        }, 2000);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Erro ao cadastrar!',
          text: 'Certifique se não há campos vazios',
          showConfirmButton: true
        });
      }
    })
  }
}
