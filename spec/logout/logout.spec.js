require('dotenv').config()
const { browser } = require('protractor')
const service = require("../../services/ExpectedConditionService.js")

const EC_Default = 550;

describe('Logout Partner Account from UAT | ', () => {

  beforeAll(() => {
    //console.log("Test: Logout Partner")
    browser.waitForAngularEnabled(false)
  })

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  })

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    browser.sleep(10000)
  })

  it('should logout user partner', async () => {
    browser.get(process.env.TEST_URL + '/main-menu')

    service.waitForLoader(1) // Wait for loader to finish
    service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for Backdrop dim to finish

    let userProfile = element(by.css('.user-name'))
    service.elementChecker(userProfile, 2, EC_Default, EC_Default)
    userProfile.click()

    browser.sleep(1000)

    let logoutBtn = element(by.cssContainingText('a', 'Log out'))
    service.elementChecker(logoutBtn, 2, EC_Default, EC_Default)
    logoutBtn.click();
  })
})
