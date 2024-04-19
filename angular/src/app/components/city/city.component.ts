import {Component, inject, ViewChild} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CityMaster } from '../../../types/CityMaster';
import { CityService } from '../../services/city.service';
import { NgFor } from '@angular/common';
import { CustomResponse } from '../../../types/CustomeResponse';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [HeaderComponent, NgFor, MatButtonModule],
  templateUrl: './city.component.html'
})
export class CityComponent {

  customResponse: CustomResponse = { statuscode:0 , data: [], message:'' };
  cityservice = inject(CityService);
  router = inject(Router);

  addcity(){
    this.router.navigateByUrl("addcity");
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCities();
  }
  getCities(): void {
    this.cityservice.getallcitys().subscribe(result => {
      this.customResponse = result;
    });
  }
  deleteCity(id:number){
    this.cityservice.deletecity(id).subscribe(res => {
      this.getCities();
    });
  }

  edit(id:number){
    this.router.navigateByUrl("editcity/"+id);
  }
}
