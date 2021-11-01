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

//Employee schema
let empSchema = new Schema({

  //Unique:true is to ensure that indexed fields don't store duplicate values
  empId: { type: String, unique: true, dropDups: true },
  firstName: { type: String },
  lastName: { type: String },
}, { collection: 'employees' })

module.exports = mongoose.model('Employee', empSchema);
