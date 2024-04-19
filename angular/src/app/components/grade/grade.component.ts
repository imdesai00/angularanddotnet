import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CustomResponse } from '../../../types/CustomeResponse';
import { Grades } from '../../../types/Grades';
import { GradeService } from '../../services/grade.service';
import { EditGradeComponent } from '../edit-grade/edit-grade.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [HeaderComponent, NgFor, MatButtonModule, EditGradeComponent],
  templateUrl: './grade.component.html'
})
export class GradeComponent {

  datas:Grades[]=[];
  constructor(private gradeservice:GradeService, private route:Router){}

  ngOnInit(): void {

    this.getgrade();
  }

  addgrade(){
    this.route.navigateByUrl("addgrade");
  }
  editgrade(id:any){
    this.route.navigateByUrl("editgrade/"+id);
  }
  getgrade(){
    this.gradeservice.getgrade().subscribe( res => {
      this.datas = res.data;
    });
  }
  deletegrade(id:any){
    this.gradeservice.deletegrade(id).subscribe(res => {
      this.getgrade();
    });
  }
}
