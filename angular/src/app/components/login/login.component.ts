import { RegisterService } from './../../services/register.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { confirmPasswordValidator } from '../validators/confirmpassword.validator';
import { emailvalidator } from '../validators/email.validators';
import { passwordValidator } from '../validators/password.validator';
import { phoneNumberValidator } from '../validators/phoneNumber.validtor';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginform!:FormGroup;
  constructor(private formbuilder:FormBuilder, private registerservice:RegisterService, private router:Router){}

  ngOnInit(): void {

    this.loginform = this.formbuilder.group({
      Email: ['',[Validators.required, emailvalidator()]],
      Password: ['',[Validators.required, passwordValidator()]]
    })    
  }
  // login(){

  //   if (this.loginform.valid) {
  //     console.log('Form submitted:', this.loginform);
  //     console.log(this.loginform.value);
  //     this.registerservice.createuser(this.loginform.value).subscribe( res => {
  //       alert("User Created");
  //       this.router.navigateByUrl("login");
  //     })
  //   } else {
      
  //   }
    
  // }
  login(): void {
    this.registerservice.login({ email:this.loginform.value["Email"] , password: this.loginform.value["Password"] }).subscribe(() => {
        this.router.navigateByUrl('/'); // Redirect to dashboard after successful login
      }, error => {
        console.error('Login failed:', error);
        // Handle login error (e.g., display error message)
      });
  }
}
