import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, UrlSerializer, NoPreloading } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanLoadAuthGuard } from './services/can-load-auth.guard';
import { CustomPreloadingStrategy } from './services/custom-preloading.strategy';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full"//generally any path can match prefix of '' empty. so you need prefix as 'http://localhost:4200' as full path match
  },
  {
    path: "courses",
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    // canLoad: [CanLoadAuthGuard]

    /**
     * if user loggedIn and directly access course page, its shows login page but it still loaded the course module.
     * to prevent this use canLoad
     *
     * Remove canLoad if preloadingStrategy:'PreloadAllModules' as canLoad is specific to route, so it takes precedence over preloadAllModules
     */
    data: {//this is used with 'CustomPreloadingStrategy'
      preload: false//true > to preload the lazy loaded module. false otherwise
    }
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: 'helpdesk-chat',
    component: ChatComponent,
    outlet: 'chat'//this component will only be shaowd at named routed-outlet of chat
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
      preloadingStrategy: CustomPreloadingStrategy,
      /*preloadingStrategy:'NoPreloading'(default)
      no lazyloaded modules are preloaded at startup time

      preloadingStrategy:'PreloadAllModules' >remove 'canload' if you use this  > preload all lazyloaded modules at startup time
        */
      enableTracing: true,//true >router module in debug mode
      useHash: true,//server ignores anything after /#/ in url
      scrollPositionRestoration: 'enabled',//use all time //default is scroll position mantained
      //enabled> on forward scroll to top, on backward maintain scroll position
      //use 'enabled' in all angular projects in prod. in future it is default

      paramsInheritanceStrategy: 'always',
      /**use it all times always
       * In lessonDetailResolver
       * const courseUrl=route.parent.paramMap.get('courseUrl'),
       *        lessosnSeqNo=route.paramMap.get('lessonSeqNo')
       *
       * by default we can't access course control parameter like
       * route.paramMap.get('courseUrl')
       *
       * to get current or any parent route parameter directly with roouter.paramMap
       * use paramsInheritanceStrategy:'always'
       */
      relativeLinkResolution: 'corrected',
      /**
       * use alll time //default 'legacy'
       * 'corrected' >recommanded always
       *
       * ex: there is empty path in course roouting like {path:'',component:HommeComponent}
       * sometimes when we try to navigate to current component useing router-link with './' won't work
       * and you would be forced inorder to navigate to same component that we are on to parent component like '../'
       * this is confusing that for some components if we want to trigger navigation to itself we use './' which is correct
       * but for specific components which have empty path, we have to navigate to parent component '../' instead
       * to avoid this use relativeLinkResolution: 'corrected'
       */
      malformedUriErrorHandler:
        (error: URIError, urlSerializer: UrlSerializer, url: string) =>//use all time
          urlSerializer.parse("/page-not-found")//redirect to page not found

      // this function will be triggered whenever there is problem parsing url with strange characters (can't be parsed by browser)
    })
  ],
  exports: [RouterModule],
  providers: [
    CanLoadAuthGuard,
    CustomPreloadingStrategy
  ]
})
export class AppRoutingModule {


}
