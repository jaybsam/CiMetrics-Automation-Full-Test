require('dotenv').config()
const mailinator = require("../../test-data/verification.json")
const user = require("../../test-data/userdata.json")
const service = require("../../services/ExpectedConditionService.js")

const EC_Defaut = 250;

describe('Email Verification | Work item #1873', () => { 

  afterEach(() => {
    browser.sleep(3000)
  })

  it('should navigate to message', () => {
    browser.waitForAngularEnabled(false);
    browser.get(mailinator.url + user.login.email)

    url = mailinator.url + user.login.email
    service.elementReadyCheck(url, 'urlIs', 3, 3000, EC_Defaut)

    browser.get(mailinator.url + user.login.email)

    url = mailinator.url + user.login.email
    service.elementReadyCheck(url, 'urlIs', 3, 3000, EC_Defaut)

    service.elementReadyCheck('.jambo_table > tbody > tr', 'css', 2, EC_Defaut, EC_Defaut)
    element.all(by.css('.jambo_table > tbody > tr')).each(async (row, index) => {
      let mailsubject = await row.$$('td:nth-child(3)').get(0).getText();
      if(mailsubject === 'Confirm your email'){
        row.$$('td:nth-child(3)').click();
        expect(mailsubject).toEqual('Confirm your email')
      }
    })
  })
  it('should click email verification link', async () => {
    let frame1 = element(by.id("html_msg_body")).getWebElement();
    browser.switchTo().frame(frame1)

    service.elementReadyCheck('a&&Verify Email Address', 'cssContainingText', 2, EC_Defaut, EC_Defaut)
    await element(by.cssContainingText('a', 'Verify Email Address')).click().then(() => {
      // browser.getAllWindowHandles().then((handles) => {
      //   newWindowHandle = handles[1]; // this is your new window
      //   browser.switchTo().window(newWindowHandle).then(() => {
      //           browser.sleep(5000)
      //           expect(browser.getCurrentUrl()).toMatch(process.env.TEST_URL+'/emailverified');
      //   })
      // })
    }) 
  })
})
