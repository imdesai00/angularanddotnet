import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomResponse } from '../../types/CustomeResponse';
import { CityMaster } from '../../types/CityMaster';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'https://localhost:7140/api/City';

  httpClient = inject(HttpClient);
  constructor(private http: HttpClient) { }

  getallcitys(): Observable<CustomResponse>{
    return this.http.get<CustomResponse>(this.apiUrl);
  }

  deletecity(id:number){
    var url = this.apiUrl+'/'+id;
    return this.http.delete(url);
  }

  createcity(citymaster: CityMaster): Observable<CityMaster>{
    var url = this.apiUrl;
    return this.http.post<CityMaster>(url,citymaster);
  }

  updatecity(id: number, citymaster: CityMaster): Observable<CityMaster> {
    
    var url = this.apiUrl+'/'+id;
    console.log(url);
    // const url = `${this.apiUrl}/${id}`;
    return this.http.put<CityMaster>(url, citymaster);
  }

  getcitybyid(id:number): Observable<CustomResponse>{
    
    var url = this.apiUrl + '/' + id;
    return this.http.get<CustomResponse>(url);
  }

  getallstate(): Observable<CustomResponse>{

    var url = this.apiUrl + '/state';
    return this.http.get<CustomResponse>(url); 
  }
  getcountrybystate(id:number): Observable<CustomResponse>{

    var url = this.apiUrl + '/country/' + id;
    return this.http.get<CustomResponse>(url);
  }
  getcountrybyid(id:number): Observable<CustomResponse>{

    var url = this.apiUrl + '/countrys/' + id;
    return this.http.get<CustomResponse>(url);
  }
  getallcountry(): Observable<CustomResponse>{

    var url = this.apiUrl + '/countrys';
    return this.http.get<CustomResponse>(url);
  }
}