/**
 * Title: app.routing.ts
 * Author: Alex Haefner
 * Date: 21 September 2021
 * Description: The app routing file for bobs services
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInGuard } from './sign-in.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
      path: '',
      component: BaseLayoutComponent,
      children: [
      {
        path: '',
        component: HomeComponent
      },
      ],
      canActivate: [SignInGuard]
  },
  {
    path: 'session',
    component: SignInComponent,
    children: [
    {
      path: 'not-found',
      component: NotFoundComponent
    },
    {
      path: 'sign-in',
      component: SignInComponent
    }
    ]
},
{
  path: '**',
  redirectTo: 'session/not-found'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
