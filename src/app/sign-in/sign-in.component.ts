/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Description: TS file for sign-in component
 * Sources: https://stackoverflow.com/questions/42392373/angular-2-validators-pattern-not-working
 */

import { Component, OnInit, Input, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
    });
  }

  login(): void {
    const empId = this.form.controls['empId'].value;

    //Get empId from mongoDB
    this.http.get('/api/employees/' + empId).subscribe((res) => {
      if (res) {
        //Adding first+last name to session storage
        sessionStorage.setItem(
          'name',
          `${res['firstName']} ${res['lastName']}`
        );

        //Setting empId as session_user, navigate to home if ID is valid
        this.cookieService.set('session_user', empId, 1);

        this.router.navigate(['/']);
      } else {
        this.error = 'Invalid employee ID';
      }
    });
  }
}
