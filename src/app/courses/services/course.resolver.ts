import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Course } from '../model/course';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesService } from './courses.service';
import { first } from 'rxjs/operators';

@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private courses: CoursesService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Course | Observable<Course> {
        /**
         * ActivatedRouteSnapshot > tells which route is active
         * RouterSnapshot > has info about all the current state of the router
         * localhost:4200/courses/angular-router-course
         * localhost:4200/courses/{:courseUrl path varibables}
         */
        const courseUrl = route.paramMap.get("courseUrl");

        return this.courses.loadCourseByUrl(courseUrl)
        // .pipe(
        //     first() //takes only first value emitted by observable and completes
        // );
    }

}
