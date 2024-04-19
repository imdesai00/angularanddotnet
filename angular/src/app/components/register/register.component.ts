import { User } from './../../../types/User';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { confirmPasswordValidator } from '../validators/confirmpassword.validator';
import { emailvalidator } from '../validators/email.validators';
import { passwordValidator } from '../validators/password.validator';
import { phoneNumberValidator } from '../validators/phoneNumber.validtor';
import { RegisterService } from '../../services/register.service';
import { MatchPasswordValidator } from '../validators/match-password.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerform!:FormGroup;
  constructor(private formbuilder:FormBuilder, private registerservice:RegisterService, private router:Router){
    this.registerform = this.formbuilder.group({
      UserName: ['',[ Validators.required]],
      PhoneNo: ['',[Validators.required, phoneNumberValidator()]],
      Email: ['',[Validators.required, emailvalidator()]],
      Password: ['',[Validators.required, passwordValidator()]],
      ConfirmPassword: ['', [Validators.required]],
    }, {
      validator: MatchPasswordValidator
    }); 
  }
  register(){

    console.log('Form submitted:', this.registerform.value);
    // if (this.registerform.valid) {

    //   console.log('Form submitted:', this.registerform.value);
    //   var user = { username:this.registerform.value["UserName"], email:this.registerform.value["Email"],phoneno:this.registerform.value["PhoneNo"],password:this.registerform.value["Password"]}
    //   console.log('Form submitted:', user);
    //   this.registerservice.createuser(user).subscribe( () => {
    //     alert("User Created");
    //     this.router.navigateByUrl("login");
    //   })
    // }
  }
}
