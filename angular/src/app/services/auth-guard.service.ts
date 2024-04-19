import { RegisterService } from './register.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private registerservice: RegisterService, private router: Router) { }

  canActivate(): boolean {
    if (this.registerservice.isLoggedIn()) {
      return true; // Allow access if user is authenticated
    } else {
      this.router.navigateByUrl('/login'); // Redirect to login page if user is not authenticated
      return false;
    }
  }
}