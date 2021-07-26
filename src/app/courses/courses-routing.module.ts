import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { CourseResolver } from './services/course.resolver';
import { LessonDetailComponent } from './lesson/lesson-detail.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { LessonsResolver } from './services/lessons.resolver';
import { LessonDetailResolver } from './services/lesson-detail.resolver';
import { AuthGuard } from '../services/auth.guard';
import { ConfirmExitGuard } from '../services/confirm-exit.guard';

//canActivate > activates when you try navigate into component
//canDeactivate > activates when you try navigate away from component
//canDeactivate triggers only if you completely go away from courseComponent (eg: to /about). it wont trigger if you go to one of its child route.

//all routes here have child routes of '/courses' in  app-routing courses lazy load
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [ConfirmExitGuard],
    children: [
      {
        path: "",
        component: LessonsListComponent,
        resolve: {
          lessons: LessonsResolver
        }
      },
      {
        path: "lessons/:lessonSeqNo",
        component: LessonDetailComponent,
        resolve: {
          lesson: LessonDetailResolver
        }
      }
      //http://localhost:4200/courses/angular-router-course/lessons/17
    ],
    resolve: {
      course: CourseResolver
    }
  }

  /**
   * :courseUrl > eg: courses/angular-routing-course
   * CourseComponent can call api service to get data. but id api fails or slow response, it will show broken screen.
   * to avoid this use 'RESOLVER'
   * Route completes only if CourseResolver fetches course data
   */
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    CourseResolver,
    LessonsResolver,
    LessonDetailResolver,
    AuthGuard,
    ConfirmExitGuard
  ]
})
export class CoursesRoutingModule {

}
