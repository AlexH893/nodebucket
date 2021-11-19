/*
 * Author: Professor Krasso
 * Modified by: Alex Haefner
 * Date: 11.10.2021
 * Description: Employee model
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemDocument = require("./item");

//Employee schema
let empSchema = new Schema(
  {
    //Unique:true is to ensure that indexed fields don't store duplicate values
    empId: { type: String, unique: true, dropDups: true },
    firstName: { type: String },
    lastName: { type: String },
    todo: [ItemDocument],
    done: [ItemDocument],
    current: [ItemDocument],
  },
  { collection: "employees" }
);

module.exports = mongoose.model("Employee", empSchema);
