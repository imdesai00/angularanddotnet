import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }
  constructor(private registerservice:RegisterService, private router:Router){}
  logout(): void {
    this.registerservice.logout();
    this.router.navigateByUrl("login");
    // Redirect to login page after logout
  }
}
