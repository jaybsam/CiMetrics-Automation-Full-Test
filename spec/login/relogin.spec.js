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
    let email = element(by.id("input-email"))
    let password = element(by.id("input-password"))
    let button = element(by.buttonText("Log In"))

    service.elementReadyCheck('input-email', 'id', 2, EC_Defaut, EC_Defaut)
    email.sendKeys(user.login.email + user.login.emailprefix)

    service.elementReadyCheck('input-password', 'id', 2, EC_Defaut, EC_Defaut)
    password.sendKeys(user.login.password)

    service.elementReadyCheck('Log In', 'buttonText', 2, EC_Defaut, EC_Defaut)
    button.click()
  })
})
