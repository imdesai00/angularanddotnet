import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  private url = "https://localhost:7140/api/Auth/forgot-password";
  private urll = "https://localhost:7140/api/Auth/reset-password";
  constructor(private http:HttpClient) { }

  resetpass(Email:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      responseType: 'text' as 'json' // Expect text response that gets parsed as JSON
    };
    return this.http.post(this.url,Email,httpOptions);
  }
  validatePasswordResetToken(data: { Email: any; Token: string | null; Password: any; }): Observable<any> {
    return this.http.post<any>(this.urll, data);
  }
}
