import { Component, OnInit, Input, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SignInService } from '../sign-in.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Output() empId;
  //var with type of FormGroup
  SignInForm: FormGroup;

  //error message var with type of string
  errorMsg: string = '';
//, private SignInService: SignInService
  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private SignInService: SignInService) {

    //using formbuilder to create a new formgroup with a formcontrol named studentId
    this.SignInForm = this.fb.group({

      //the valid pattern - only numbers -> '^[0-9]*$'
      userId: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')])],


      //the valid pattern - only letters
      password: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])]

    })
   }

  ngOnInit(): void {
  }

  get form() { return this.SignInForm.controls; }




  //on submit function
  onSubmit() {

    const formValues = this.SignInForm.value;

    //getting userId value from the userId FormControl
    const userId = (formValues.empId);

    //getting password value from the password FormControl
    const password = (formValues.password);

    //if statement that will compare returned values from signInService function.
    //if true add a cookie to users browser & use router to navigate them to root path
    //otherwise assign an error message
    if ( (this.SignInService.validatePw(password)) ) {
      if (this.SignInService.validate(this.empId)) {




      this.cookieService.set('session_user', userId.toString(), 1);



      this.router.navigate(['/']);

    } else {

      //displays if invalid creds entered
      this.errorMsg = 'The user ID you entered is invalid, please try again.';

    }
  }


  return this.empId;

}


}
