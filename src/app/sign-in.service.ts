import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

//new var with type of array
empId: Array<string>;

passwords: Array<string>;



  constructor() {

    //the values that hold the login credentials - not ideal method of credential storage
    this.empId = ["worker", "customer", "janet1981"];

    this.passwords = ["admin"];

   }

   //validating the user id
   validate( userId:string ) {

     //iterating over the array and returning true if match was found
     return this.empId.some( id => id === userId);

   }

   //validating the password
   validatePw(password:string) {

     return this.passwords.some( pass => pass === password);

}

getUsername() {
      return JSON.parse(localStorage.getItem('session_user')).empId;
}

}
