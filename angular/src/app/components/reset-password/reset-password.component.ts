import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetService } from '../../services/reset.service';
import { HeaderComponent } from '../header/header.component';
import { emailvalidator } from '../validators/email.validators';
import { MatchPasswordValidator } from '../validators/match-password.validator';
import { passwordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  
  newPassword: string = '';
  confirmPassword: string = '';
  token: string | null = '';
  email:string | null = '';
  error: string | undefined;
  updatepassform!:FormGroup;
  constructor(private formbuilder:FormBuilder, private resetservice:ResetService, private router:Router, private aruote:ActivatedRoute){
    this.token = this.aruote.snapshot.queryParamMap.get('token');
    this.email = this.aruote.snapshot.queryParamMap.get('email');
    this.updatepassform = this.formbuilder.group({
      Password: ['',[Validators.required, passwordValidator()]],
      ConfirmPassword: ['', [Validators.required]],
    }, {
      validator: MatchPasswordValidator
    }); 
  }

  ngOnInit(): void {

      
  }
  updatepass(){
    var updatepass = {Email : this.email, Token : this.token, Password : this.updatepassform.value["Password"]};
    console.log(updatepass);
    this.resetservice.validatePasswordResetToken(updatepass).subscribe(res => {
      this.router.navigateByUrl("login");
    })
    
  }
}
