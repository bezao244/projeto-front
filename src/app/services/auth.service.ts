import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl =  'http://localhost:3000/';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }

  singin(user: any){
    return this.http.post(`${this.baseUrl}user/singin`, user);
  }
  // isAuth():boolean{
  //   const token = JSON.parse(localStorage.getItem('token')!);
    
  //   if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
  //     return false;
  //   }
  //   return true;
  // }

  create(user: any){
    return this.http.get(`${this.baseUrl}user/create`, user);
  }
}
