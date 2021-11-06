/**
 * Title: sign-in.guard.ts
 * Author: Alex Haefner
 * Date: 30 Oct 2021
 * Description: The sign-in guard file for nodebucket
 */

//imports
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const sessionUser = this.cookieService.get('session_user');

   //if statement to check the value, if true, return true.  If false, use the router to redirect users back to the sign-in page
    if (sessionUser) {
      return true;

    } else {

      this.router.navigate(['/session/sign-in']);

      return false;
    }
  }
}
