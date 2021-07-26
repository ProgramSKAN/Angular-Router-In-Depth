import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { LessonDetail } from "../model/lesson-detail";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'lesson',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  //lesson : LessonDetail;
  lesson$: Observable<LessonDetail>;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("Created LessonDetailComponent...");
  }

  ngOnInit() {
    //this.lesson = this.route.snapshot.data['lesson']; //with this next and previous won't work properly as we changing to same route component
    //snapshot only gives first values emitted by route. so below in this case

    this.lesson$ = this.route.data.pipe(map(data => data["lesson"]));
  }

  previous(lesson: LessonDetail) {
    // http://localhost:4200/courses/angular-router-course/lessons/17
    //this.route.parent> http://localhost:4200/courses/angular-router-course

    this.router.navigate(['lessons', lesson.seqNo - 1], { relativeTo: this.route.parent });
  }


  next(lesson: LessonDetail) {
    this.router.navigate(['lessons', lesson.seqNo + 1], { relativeTo: this.route.parent });
  }
}
