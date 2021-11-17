/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Description: Contains employee routes
 * Sources:
 */

var express = require("express");
const router = express.Router();
const Employee = require("../models/employee.js");
const BaseResponse = require("../models/base-response.js");

/*
 * Find employee by ID API
 */
router.get("/:empId", async (req, res) => {
  try {
    //
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/*
 * CreateTask API
 */
router.post("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Internal server error: " + err.message,
        });
      } else {
        console.log(employee);

        const newItem = {
          text: req.body.text,
        };

        employee.todo.push(newItem);

        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);
            res.status(500).send({
              message: "Internal server error: " + err.message,
            });
          } else {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

/*
 * FindAllTasks
 */
router.get("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne(
      { empId: req.params.empId },
      "empId todo done current",
      function (err, employee) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: "Interal server error:" + err.message,
          });
        } else {
          console.log(employee);
          res.json(employee);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send("Interal server error: " + e.message);
  }
});

/*
 * Update task
 */

router.put("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);

        const updatedTaskMongoErrorResponse = new BaseResponse(
          "501",
          `MongoDB server error`,
          err
        );

        res.status(501).send(updatedTaskMongoErrorResponse.toObject());
      } else {
        console.log(employee);

        employee.set({
          todo: req.body.todo,
          current: req.body.current,
          done: req.body.done,
        });

        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);

            const updateTaskOnSaveMongoErrorResponse = new BaseResponse(
              "500",
              "MongoDB server error",
              err
            );

            res.status(500).send(updateTaskOnSaveMongoErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);

            const updatedTaskOnSuccessReponse = new BaseResponse(
              "200",
              "Update success!",
              updatedEmployee
            );

            res.json(updatedTaskOnSuccessReponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);

    const updateTaskCatchErrorResponse = new BaseResponse(
      "500",
      "Internal server error",
      e
    );

    res.status(500).send(updateTaskCatchErrorResponse.toObject());
  }
});

/*
 * Delete task
 */
router.delete("/:empId/tasks/:taskId", async (req, res) => {
  try {
    Employee.findOne(
      {
        empId: req.params.empId,
      },
      function (err, employee) {
        if (err) {
          console.log(err);

          const deleteTaskMongoErrorResponse = new BaseResponse(
            "501",
            "MongoDB server error",
            err
          );

          res.status(501).send(deleteTaskMongoErrorResponse.toObject());
        } else {
          console.log(employee);

          const toDoItem = employee.todo.find(
            (item) => item._id.toString() === req.params.taskId
          );

          const currentItem = employee.current.find(
            (item) => item._id.toString() === req.params.taskId
          );

          const doneItem = employee.done.find(
            (item) => item._id.toString() === req.params.taskId
          );

          if (toDoItem) {
            employee.todo.id(toDoItem._id).remove();
            employee.save(function (err, updatedTodoItemEmployee) {
              if (err) {
                console.log(err);

                const deleteTodoItemMongoErrorResponse = new BaseResponse(
                  "501",
                  "MongoDB server error",
                  err
                );

                res
                  .status(501)
                  .send(deleteTodoItemMongoErrorResponse.toObject());
              } else {
                console.log(updatedTodoItemEmployee);

                const deleteTodoItemOnSuccessResponse = new BaseResponse(
                  "200",
                  "Removed item from todo list",
                  updatedTodoItemEmployee
                );

                res.json(deleteTodoItemOnSuccessResponse.toObject());
              }
            });
          } else if (doneItem) {
            employee.done.id(doneItem._id).remove();

            employee.save(function (err, updatedDoneItemEmployee) {
              if (err) {
                console.log(err);

                const deleteDoneItemMongoErrorResponse = new BaseResponse(
                  "501",
                  "MongoDB server error",
                  err
                );

                res
                  .status(501)
                  .send(deleteDoneItemMongoErrorResponse.toObject());
              } else {
                console.log(updatedDoneItemEmployee);

                const deleteDoneItemOnSucessResponse = new BaseResponse(
                  "200",
                  "Removed item from done list",
                  updatedDoneItemEmployee
                );

                res.json(deleteDoneItemOnSucessResponse.toObject());
              }
            });
          } else if (currentItem) {
            employee.current.id(currentItem._id).remove();

            employee.save(function (err, updatedCurrentItemEmployee) {
              if (err) {
                console.log(err);

                const deleteCurrentItemMongoErrorResponse = new BaseResponse(
                  "501",
                  "MongoDB server error",
                  err
                );

                res
                  .status(501)
                  .send(deleteCurrentItemMongoErrorResponse.toObject());
              } else {
                console.log(updatedCurrentItemEmployee);

                const deleteCurrentItemOnSucessResponse = new BaseResponse(
                  "200",
                  "Removed item from done list",
                  updatedCurrentItemEmployee
                );

                res.json(deleteCurrentItemOnSucessResponse.toObject());
              }
            });
          } else {
            console.log("Invalid task Id: " + req.params.taskId);

            const currentTaskNotFoundResponse = new BaseResponse(
              "300",
              "Invalid task Id",
              req.params.taskId
            );

            res.status(300).send(currentTaskNotFoundResponse.toObject());
          }
        }
      }
    );
  } catch (e) {
    console.log(e);

    const deleteTaskCatchErrorResponse = new BaseResponse(
      "500",
      "Internal server error",
      e
    );

    res.status(500).send(deleteTaskCatchErrorResponse.toObject());
  }
});

module.exports = router;
