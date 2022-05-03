import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  crudForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      userName: [null],
      pass: [null],
      roleId: [null]
    });
  }
  cadastrar(){
    let modal = {
      userName: this.crudForm.value.userName,
      pass: this.crudForm.value.pass,
      roleId: this.crudForm.value.roleId
    }
    console.log(modal);
    this.authService.create(modal).subscribe(()=>{
      console.log('ok');
    })
  }

}
