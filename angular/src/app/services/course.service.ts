import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse } from '../../types/CustomeResponse';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiurl = 'http://localhost:5254/api/Grades/course';
  constructor(private  http:HttpClient) { }

  getcoursebystudent(id:number): Observable<CustomResponse>{

    var url = this.apiurl + '/' + id;
    return this.http.get<CustomResponse>(url);
  }
}
