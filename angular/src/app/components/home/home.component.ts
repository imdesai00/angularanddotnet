import { Router } from '@angular/router';
import { RegisterService } from './../../services/register.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NgIf],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private registerservice:RegisterService, private router:Router){}
  logout(): void {
    this.registerservice.logout();
    this.router.navigateByUrl("login");
    // Redirect to login page after logout
  }
}
