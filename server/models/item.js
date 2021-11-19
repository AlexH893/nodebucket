/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Description: Item schema
 * Sources:
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String },
});

module.exports = itemSchema;
