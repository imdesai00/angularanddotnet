import { CustomResponse } from '../../types/CustomeResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grades } from '../../types/Grades';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private apiurl = 'http://localhost:5254/api/Grades';

  constructor(private http: HttpClient) { }
  
  getgrade(): Observable<CustomResponse>{
    
    return this.http.get<CustomResponse>(this.apiurl);
  }

  deletegrade(id:number){

    var url = this.apiurl+'/'+id;
    return this.http.delete(url);
  }

  addgrade(grd:Grades){

    return this.http.post<Grades>(this.apiurl,grd);
  }
  updategrade(id: number, grade:Grades): Observable<Grades> {

    var url = this.apiurl+'/'+id;
    // const url = `${this.apiUrl}/${id}`;
    return this.http.put<Grades>(url, grade);
  }

  getgradebyid(id:number): Observable<CustomResponse>{
    
    var url = this.apiurl + '/' + id;
    return this.http.get<CustomResponse>(url);
  }
  
}
