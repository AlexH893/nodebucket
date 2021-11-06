const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


/*

Override the username field in the options object
*/
passport.use(new LocalStrategy({
  usernameField: 'empId'
  },
   (password, done) => {
  }
));

/*
Mongoose call to find users given the overrided empId
and password supplied to the function. This function does the following:
Finds a user with the empId & password supplied
Checks whether the password is valid
Returns employee object if the employee is found w/valid password
If not, return an error message
*/

passport.use(new LocalStrategy({
  usernameField: 'empId'
},
  (empId, password, done) => {
    //Searching DB for user with supplied empID
    Employee.findOne({ empId: username} , (err, employee) => {
      //If no employee is found, return false w/error msg
      if (!user) {
        return done(null, false. {
          message: 'Incorrect employee ID'
        });
      }
      //Calling validPassword method, passing the supplied password
      if (!employee.validPassword(password)) {
        //If incorrect password, return false w/error msg
        return done(null, false, {
          message: 'Incorrect password'
        });
      }
      return done(null, employee); //If end is reached, return employee object
    });
  }
));
