import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  // Define the assignment name
  constructor(private cookieService: CookieService, private router: Router) {
  }

  ngOnInit(): void {
  }
  //Add a new function named signOut()
  signOut() {
    //call the cookieService.deleteAll function and then use the Router to navigate users to the sign-in page
    this.cookieService.deleteAll();
    this.router.navigate(['/session/sign-in']);
  }

}
