require('dotenv').config()
const { browser } = require('protractor')
const user = require("../../test-data/userdata.json")
const service = require("../../services/ExpectedConditionService.js")

const EC_Defaut = 250;

describe('Access URL (site is up) | Work item #1872', () => {

  beforeAll(() => {
    //console.log("Test: Login Partner")
    browser.waitForAngularEnabled(false);
  })

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  })

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    browser.sleep(10000)
  })

  it('should login partner account', async () => {
    browser.get(process.env.TEST_URL + '/login')
    
    service.waitForLoader(1) // Wait for loader to finish
    service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for Backdrop dim to finish

    let email = element(by.id("input-email"))
    let password = element(by.id("input-password"))
    let button = element(by.buttonText("Log In"))

    service.elementChecker(email, 2, EC_Defaut, EC_Defaut)
    email.sendKeys(user.login.email + user.login.emailprefix)

    service.elementChecker(password, 2, EC_Defaut, EC_Defaut)
    password.sendKeys(user.login.password)

    service.elementChecker(button, 2, EC_Defaut, EC_Defaut)
    button.click()
    
    let checkUsername = element(by.css('.user-name'))
    let checkUserTitle = element(by.css('.user-title'))

    service.elementChecker(checkUsername, 2, EC_Defaut, EC_Defaut)        
    expect(checkUsername.getText()).toEqual(user.login.email + user.login.emailprefix)

    service.elementChecker(checkUserTitle, 2, EC_Defaut, EC_Defaut)        
    expect(checkUserTitle.getText()).toEqual(user.login.primaryorg)
  })
})
