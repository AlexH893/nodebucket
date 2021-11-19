/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Description: Enters in an employee ID into the text field & clicks the submit button
 * Sources:
 */

describe("Protractor Demo App", function () {
  var taskButton = element(by.id("step2"));

  it("should enter in an emp id", function () {
    browser.get("http://localhost:4200/#/");
    expect(browser.getTitle()).toEqual("Nodebucket");

    /*
     * Here we are entering in a valid employee ID, then locating the sign in button & clicking
     */
    element(by.id("signInField")).sendKeys("1007");
    browser.sleep(2000); //wait 2 seconds
    element(by.id("signInBtn")).click();
    browser.sleep(2000);
  });
});
