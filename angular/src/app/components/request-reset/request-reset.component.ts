import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetService } from '../../services/reset.service';
import { HeaderComponent } from '../header/header.component';
import { emailvalidator } from '../validators/email.validators';

@Component({
  selector: 'app-request-reset',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, NgIf],
  templateUrl: './request-reset.component.html',
  styleUrl: './request-reset.component.css'
})
export class RequestResetComponent {

  error: string | undefined;
  emailform!:FormGroup;
  constructor(private formbuilder:FormBuilder, private resetservice:ResetService, private router:Router){}

  ngOnInit(): void {

    this.emailform = this.formbuilder.group({
      email: ['',[Validators.required, emailvalidator()]]
    })    
  }
  resetemail(){
    this.resetservice.resetpass(this.emailform.value).subscribe({
      next: (response) => {
        console.log('User created', response);
        this.error = undefined;
        this.router.navigateByUrl("login");
      },
      error: (error: string) => {
        this.error = error;
      }
      // alert("reset passowrd mail send");
      // this.router.navigateByUrl("/login");
    });
    console.log(this.emailform.value);
  }
}
