import { Router } from '@angular/router';
import { Loginmodule } from './../../types/Loginmodul';
import { User } from '../../types/User';
import { Token } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = "https://localhost:7140/api/Auth";
  constructor(private http:HttpClient, private route:Router) { }
  createuser(user:{username:string, email:string, phoneno:number, password:string}): Observable<User>{
    var apiurl = this.url + "/register";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      responseType: 'text' as 'json' // Expect text response that gets parsed as JSON
    };
    return this.http.post<User>(apiurl,user,httpOptions);
  }
  login(credentials: { email: string, password: string }): Observable<any> {
    var apiurl = this.url + "/login";
    return this.http.post<{ token: string; refToken: string }>(apiurl, credentials).pipe(
        tap(response => {
          if (response && response.token && response.refToken) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('reftoken',response.refToken);
            // this.storetoken(response.token);
          }
        })
      );
  }
  // refreshToken(): Observable<string> {
  //   const refreshToken = localStorage.getItem('reftoken');
  //   return this.http.post<any>(`https://localhost:7140/api/Auth/regenerate?reftoken=${refreshToken}`,{})
  //   .pipe(
  //     tap((response:any) => {
  //         localStorage.setItem('token', response.regeneratetoken);
  //         console.log("token stored",response.regeneratetoken)
  //     })
  //   );
  // }
  logout(): void {
    localStorage.removeItem('token'); 
    localStorage.removeItem('reftoken');
    this.route.navigateByUrl("login");
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }
  getToken(): string | null{
    return localStorage.getItem('token'); 
  }
  getrefToken(): string | null{
    return localStorage.getItem('reftoken'); 
  }
}