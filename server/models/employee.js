/*
============================================
; Title:  employee.js
; Author: Alex Haefner
; Date: Date: 10-27-2021
; Description: Employee model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

//Employee schema
let empSchema = new Schema({

  //Unique:true is to ensure that indexed fields don't store duplicate values
  empId: { type: String, unique: true, dropDups: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  hash: String,
  salt: String
  });

/*
When the setPassword method is called and supplied a password, the salt and
the hash are generated for users and added to the model instance. The password is
never saved anywhere and not even stored in memory.
*/

empSchema.methods.setPassword = function (password) {
 this.salt = crypto.randomBytes(16).toString('hex');
 this.hash = crypto
 .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
 .toString('hex');
}






empSchema.methods.validPassword = function (password) {
 const hash = crypto
 .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
 .toString('hex');
 return this.hash === hash;
};



/*
Sses the data from the current user model to create a unique JWT
and return it


*/

empSchema.methods.generateJwt = function () {
 const expiry = new Date();
 expiry.setDate(expiry.getDate() + 7);
 return jwt.sign({
 empId: this.empId,
 password: this.password,
 firstName: this.firstName,
 lastName: this.lastName
 exp: parseInt(expiry.getTime() / 1000, 10),
//Using environment variables instead of keeping secrets in code
}, 'thisIsSecret' ); //}, process.env.JWT_SECRET);
}

module.exports = mongoose.model('Employee', empSchema);
