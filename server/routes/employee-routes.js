/*
============================================
; Title:  haefner-person-routes.js
; Author: Alex Haefner
; Date:   10-25-2021
; Description: Routes for employee with API calls
;===========================================
*/

var express = require('express');
const router = express.Router();
const Employee = require("../models/employee.js");


/**
 * findEmployeeById
 * @openapi
 * /api/employee/{id}:
 *   get:
 *     tags:
 *       - Employee
 *     name: findEmployeeById
 *     description:  API for returning an employee document
 *     summary: Returns an employee document based on entered id
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/employee/:empId', async(req, res) => {
  try {
    //
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

            if (err) {

                console.log(err);
                res.status(500).send({

                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(employee);
                res.json(employee);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})






/* this works */
 /*
 router.get('/employee', async(req, res) => {

     try {

         Employee.find({}, function(err, employee) {

             if (err) {

                 console.log(err); //left off here
                 res.status(501).send({

                     'message': `MongoDB exception ${err}`
                 })
             } else {
                 console.log(employee);
                 res.json(employee);
             }
         })
     } catch (e) {
         console.log(e);
         res.status(500).send({
             'message': `Server exception: ${e.message}`
         })
     }
 })
*/









module.exports = router
