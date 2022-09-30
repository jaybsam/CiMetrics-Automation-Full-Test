require('dotenv').config()
const { browser } = require('protractor')
const service = require("../../services/ExpectedConditionService.js")

const EC_Default = 250;

describe('Logout Partner Account from UAT | ', () => {

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  })

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    browser.sleep(10000)
  })

  it('should logout user partner', async () => {
    browser.get(process.env.TEST_URL + '/main-menu')

    service.waitForLoader(1) // Wait for loader to finish
    service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for Backdrop dim to finish

    let username = element(by.css('.user-name'))
    service.elementChecker(username, 2, EC_Default, EC_Default)
    username.click()

    browser.sleep(1000)

    let logout = element(by.cssContainingText('a', 'Log out'))
    service.elementChecker(logout, 2, EC_Default, EC_Default)
    logout.click();
  })
})
