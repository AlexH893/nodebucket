/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Sources: https://www.protractortest.org/#/api?view=webdriver.WebDriver.prototype.actions
 */

describe("Nodebucket", function () {
  var taskButton = element(by.id("step2"));

  it("should click create task button", function () {
    browser.get("http://localhost:4200/#/");

    /*
     * Here we are entering in a valid employee ID, then locating the sign in button & clicking
     */
    element(by.id("signInField")).sendKeys("1007");
    browser.sleep(500); //wait 2 seconds
    element(by.id("signInBtn")).click();
    element(by.id("step2")).click();
    element(by.id("createTaskField")).sendKeys("Task to be moved");
    browser.sleep(500);
    element(by.id("createBtn")).click();

    /*
     * Locate the last element with the id of 'tasktext', which is where the new task is placed after creation
     * Look for the text that was entered in the task creation menu, this is to ensure the task was properly added
     * Note: Mouse actions do not work on Chrome with the HTML5 Drag and Drop API due to a known Chromedriver issue
     */
    var taskText = element(
      by.cssContainingText(".taskString", "Task to be moved")
    );
    var currentList = element(by.id("dropCurrent"));
    var doneList = element(by.id("dropDone"));
    expect(taskText.getText()).toEqual("Task to be moved");
    browser.sleep(500);
    // Moving task to current list
    browser.actions().dragAndDrop(taskText, currentList).perform();
    browser.sleep(500);
    // Moving task to done list
    browser.actions().dragAndDrop(taskText, doneList).perform();
    browser.sleep(500);
    element(by.id("signoutBtn")).click();

    /*
     * Ensure the url after signing out
     */
    expect(browser.getCurrentUrl()).toEqual(
      "http://localhost:4200/#/session/sign-in"
    );
  });
});
