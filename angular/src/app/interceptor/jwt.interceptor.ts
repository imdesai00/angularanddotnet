import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { RegisterService } from '../services/register.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // private isRefreshing = false;
  // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public registerservice: RegisterService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Detected token is expired or invalid
          alert("Session Expired You are Loging Out")
          this.registerservice.logout();
        }
        return next.handle(req);
      })
    );
  }
}
