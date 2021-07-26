import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;
  couponCode: string;

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    //inrouting > resolve: {course: CourseResolver}
    this.course = this.route.snapshot.data["course"];

    //http://localhost:4200/courses/angular-router-course?couponCode=NEW_YEAR
    //run above link, is how coupon code on screen
    this.couponCode = this.route.snapshot.queryParamMap.get("couponCode");

    //if query params change overtime then use observable counter part like below
    //this.route.queyparams

  }

  confirmExit() {
    return confirm(`Are you sure you want to exit ${this.course.description}?`)
  }


}











