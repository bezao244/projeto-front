import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private router:Router
    ) { }

  ngOnInit(): void {
  }
  logout(){
    this.router.navigate(['home']);
  }

  irPara(){
    this.router.navigate(['cad-acesso']);
  }
  irParaCadNota(){
    this.router.navigate(['cad-nota']);
  }
  irParaCadCandidato(){
    this.router.navigate(['cad-candidato']);
  }
}
