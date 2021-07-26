import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {

  //it is trigged before navigating to the  route
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    //route > route to preload or not
    if (route.data["preload"]) {
      return load();
    }
    else {
      of(null);
    }
  }

}
