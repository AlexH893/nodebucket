/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Description: Verifies navigation to the contact page works as well as elements on page
 * Sources:
 */

describe("Protractor Demo App", function () {
  it("verify contact page", function () {
    browser.get("http://localhost:4200/#/");

    /*
     * Here we are entering in a valid employee ID, then locating the sign in button & clicking
     */
    element(by.id("signInField")).sendKeys("1007");
    browser.sleep(2000); //wait 2 seconds
    element(by.id("signInBtn")).click();
    browser.sleep(2000);
    element(by.id("contactBtn")).click();
    browser.sleep(2000);
    var streetAddress = element(by.id("streetAddress"));
    expect(streetAddress.getText()).toEqual("100 North Murray Blvd");
    browser.sleep(2000);
    element(by.id("signoutBtn")).click();
    browser.sleep(2000);

    /*
     * Ensure the url after signing out
     */
    expect(browser.getCurrentUrl()).toEqual(
      "http://localhost:4200/#/session/sign-in"
    );
  });
});
