import { Grades } from './../../../types/Grades';
import { GradeService } from './../../services/grade.service';
import { routes } from './../../../../../my_app/src/app/app.routes';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-edit-grade',
  standalone: true,
  imports: [HeaderComponent, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './edit-grade.component.html'
})
export class EditGradeComponent {

  myForm!: FormGroup;
  userData: any;
  // studentID!:number;
  // courseID!:number;
  // grade!:number;
  cid=0;

  constructor(private router:Router, private route:ActivatedRoute, private gradeservice:GradeService, private formBuilder: FormBuilder, private studentservice:StudentService, private courseservice:CourseService){}

  ngOnInit(): void {

    let id = this.route.snapshot.params["id"];
    this.cid = id;
    this.myForm = this.formBuilder.group({
      studentID: ['', [Validators.required]],
      courseID: ['', [Validators.required]],
      grade: ['', [Validators.required]],
    });
    this.gradeservice.getgradebyid(this.cid).subscribe(
      (data: any) => {
        this.userData = data.data;
        this.myForm.patchValue({
          grade: this.userData[0].grade
       })
      },
    );
    this.studentservice.getcoursebystudent(this.cid).subscribe(res => {
      this.myForm.patchValue({
         studentID: res.data
      })
    });
    this.courseservice.getcoursebystudent(this.cid).subscribe(res => {
      console.log(res.data);
      this.myForm.patchValue({
        courseID:res.data
      })
    })
    // this.gradeservice.getgradebyid(id).subscribe( res => {
    //   this.studentID = res.data[0].studentID;
    //   this.courseID = res.data[0].courseID;
    //   this.grade = res.data[0].grade;
    // })
  }

  updategrade() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      console.log('Form data:', formData);
      this.gradeservice.updategrade(this.cid, formData).subscribe( res => {
            alert("data updated");
            this.router.navigateByUrl('grade');
          })
    }
  }
  // updategrade(){
  //   var grade = { studentID:this.studentID, courseID:this.courseID, grade:this.grade};
  //   console.log(grade);
  //   this.gradeservice.updategrade(this.cid, grade).subscribe( res => {
  //     alert("data updated");
  //     this.router.navigateByUrl('grade');
  //   })
  // }
}
