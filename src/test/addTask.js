/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Steps
 * 1 Locate the create task button
 * 2 Click the task button
 * 3 Locate the task name field
 * 4 Click  button
 */

describe("Nodebucket", function () {
  var taskButton = element(by.id("step2"));

  it("should click create task button", function () {
    browser.get("http://localhost:4200/#/");

    /*
     * Here we are entering in a valid employee ID, then locating the sign in button & clicking
     */
    element(by.id("signInField")).sendKeys("1007");
    browser.sleep(2000); //wait 2 seconds
    element(by.id("signInBtn")).click();
    browser.sleep(2000);
    element(by.id("step2")).click();
    browser.sleep(2000);
    element(by.id("createTaskField")).sendKeys("Created by automation");
    browser.sleep(2000);
    element(by.id("createBtn")).click();
    browser.sleep(2000);
    /*
     * Locate the last element with the id of 'tasktext', which is where the new task is placed after creation
     * Look for the text that was entered in the task creation menu, this is to ensure the task was properly added
     */
    var taskText = element.all(by.id("taskText")).last();
    expect(taskText.getText()).toEqual("Created by automation");
    browser.sleep(2000);
  });
});
