import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

//import { ComposeMessageComponent }  from './compose-message/compose-message.component';
//import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';

//import { AuthGuard }                          from './auth/auth.guard';
//import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';


const appRoutes: Routes = [
  { path: 'home', component: AppComponent }
  // { path: 'heroes',        component: HeroListComponent },
  // { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false // <-- debugging purposes only
        //preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }