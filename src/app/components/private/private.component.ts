import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  crudForm: FormGroup;
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      userName: [null],
      pass: [null],
      roleId: [null]
    });
  }
  cadastrar(){
    var modal = {
      userName: this.crudForm.value.userName,
      pass: this.crudForm.value.pass,
      roleId: this.crudForm.value.roleId
    }
    console.log(modal);
  }

}
