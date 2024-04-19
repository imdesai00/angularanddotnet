import { CityService } from './../../services/city.service';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [HeaderComponent, FormsModule, MatButtonModule, NgFor, NgIf, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './add-city.component.html',
})
export class AddCityComponent {

  constructor(
    private router:Router, 
    private cityservice:CityService
    ){}

  data:any[] =[];
  dataa:any[] =[];
  cityName:any;
  stateId:any;
  countryId:any;

  ngOnInit(): void {
    this.getstate();
    
  }

  getstate(){
    this.cityservice.getallstate().subscribe( res => {
      this.data = res.data;
    })
  }
  getcountryname(){
    this.cityservice.getcountrybystate(this.stateId).subscribe( res => {
      this.dataa = res.data;
    })
  }
  onSelectionChange(): void {
    this.getcountryname();
  }

  savestate(){
    var city = {CityName:this.cityName, StateId:this.stateId, CountryId:this.countryId}

    this.cityservice.createcity(city).subscribe(res => {
      alert("data added");
      this.router.navigateByUrl("city");
    })
  }

}
