import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  crudForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router:Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      userName: [null],
      pass: [null]
    });
  }
  login(){
    var modal = {
      userName: this.crudForm.value.userName,
      pass: this.crudForm.value.pass
    }
    this.authService.singin(modal).subscribe( (res:any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['private']);
    });
  }
}
