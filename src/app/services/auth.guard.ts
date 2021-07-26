import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthStore,
    private router: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> {

    return this.checkIfAuthenticated();

  }

  //http://localhost:4200/courses/angular-router-course
  //login then open view course by above url and logout. stil you can access lesson detail page.
  //to prevent this use canActivateChild guard
  canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> {

    return this.checkIfAuthenticated();
  }


  private checkIfAuthenticated() {
    return this.auth.isLoggedIn$
      .pipe(
        map(loggedIn =>
          loggedIn ? true : this.router.parseUrl('/login'))
      );
  }

}
