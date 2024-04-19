import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { GradeService } from '../../services/grade.service';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-grade',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './add-grade.component.html'
})
export class AddGradeComponent {

  studentID!:number;
  courseID!:number;
  grade!:number;

  constructor(private gradeservice:GradeService, private router:Router){}

  addgrade(){

    var grade = { studentID:this.studentID, courseID:this.courseID, grade:this.grade};
    this.gradeservice.addgrade(grade).subscribe( res => {
      alert("data added");
      this.router.navigateByUrl('grade');
    })
  }

}
