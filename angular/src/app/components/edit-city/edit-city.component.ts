import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from './../../services/city.service';
import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { CityMaster } from '../../../types/CityMaster';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-edit-city',
  standalone: true,
  imports: [HeaderComponent, FormsModule, MatButtonModule, NgFor, NgIf, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './edit-city.component.html'
})
export class EditCityComponent {

  constructor(private cityService: CityService, private route: ActivatedRoute, private router: Router){}

  data:any[] =[];
  dataa:any[] =[];
  cid = 0;
  cityName:any;
  stateId:any;
  countryId:any;
  ngOnInit(): void {
    let cityid = this.route.snapshot.params["id"];
    this.cid=cityid;
    this.cityService.getcitybyid(cityid).subscribe(result => {

      this.data = result.data;
      this.dataa = result.data;
      console.log(this.data);
      this.getstate();
      this.getallcountry();
      if(this.data != null)
      {
        this.cityName = this.data[0].cityName;
        this.stateId = this.data[0].stateId;
        this.countryId = this.data[0].countryId;
      }      
    })
  }
  getstate(){
    this.cityService.getallstate().subscribe( res => {
      this.dataa = res.data;
      console.log(this.dataa);
    })
  }
  getallcountry() {
    this.cityService.getallcountry().subscribe( res => {
      this.data = res.data;
      console.log(this.data);
    })
  }
  // getcountrybyid(countryId:any){
  //   this.cityService.getcountrybyid(countryId).subscribe( res => {
  //     this.dataa = res.data;
  //   })
  // }
  getcountryname(){
    this.cityService.getcountrybystate(this.stateId).subscribe( res => {
      this.data = res.data;
    })
  }
  onSelectionChange(): void {
    this.getcountryname();
  }
  editcity(){
    var city = {CityId:this.cid,CityName:this.cityName, StateId:this.stateId, CountryId:this.countryId}
    console.log(city);
    console.log(this.cid);
    this.cityService.updatecity(this.cid,city).subscribe(res => {
      alert("data added");
      this.router.navigateByUrl("city");
    })
  }
}
