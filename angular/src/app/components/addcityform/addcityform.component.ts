import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { CityService } from '../../services/city.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-addcityform',
  standalone: true,
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule, MatSelectModule, NgFor],
  templateUrl: './addcityform.component.html',
  styleUrl: './addcityform.component.css'
})
export class AddcityformComponent {

  data:any[] =[];
  dataa:any[] =[];

  createcityform!:FormGroup;
  constructor(private formBuilder: FormBuilder, private router:Router, private cityservice:CityService) { }
  
  ngOnInit(): void {
    this.createcityform = this.formBuilder.group({
      CityName: ['', Validators.required],
      StateId: ['', Validators.required],
      CountryId: ['', Validators.required]
    });
    // const stateid = this.createcityform.get('StateId').value;
    this.getstate();
    this.createcityform.get('StateId')?.valueChanges.subscribe( res => {
      this.getcountryname(res);
    })

  }

  getstate(){
    this.cityservice.getallstate().subscribe( res => {
      this.dataa = res.data;
    })
  }
  getcountryname(id:any){
    this.cityservice.getcountrybystate(id).subscribe( res => {
      this.data = res.data;
    })
  }
  
  createcity(){
    if (this.createcityform.valid) {
      const formData = this.createcityform.value;      
      this.cityservice.createcity(formData).subscribe(res => {
        alert("data added");
      this.router.navigateByUrl("city");
      })
    } else {
      console.error('Form is invalid');
    }
    // console.log(this.createcityform.value)
    // console.log(this.createcityform.value['StateId']);
  }
}


