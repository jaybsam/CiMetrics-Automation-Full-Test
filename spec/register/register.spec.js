'use strict'
require('dotenv').config()
const { browser, $ } = require("protractor")
const input = require("../../test-data/register.json")
const service = require("../../services/ExpectedConditionService.js")
const faker = require("faker")
const fs = require("fs")

const EC_Default = 550;

let date = new Date()
let month = date.getUTCMonth() + 1
let day = date.getUTCDate()
let year = date.getUTCFullYear()
let hours = date.getHours()
let minute = ('0'+date.getMinutes()).slice(-2)
let seconds = date.getSeconds()

let id = year + "" + month + "" + day  + "" + hours + "" + minute + "" + seconds

let fulldate = year + "-" + month + "-" + day + " " + hours + ":" + minute

let fakeFirstName = faker.name.firstName()
let fakeLastName = faker.name.lastName()
let fakerCorrespondence = faker.name.jobTitle()

let data = {
  'login': {
    'date_created': fulldate, 
    'email': fakeFirstName + id,
    'emailprefix': "@mailinator.com", 
    'password': input.signup.password,
    'confirmpassword': input.signup.password,
    'primaryorg': input.signup.primaryorg,
    'correspondence': fakerCorrespondence,
    'firstname': fakeFirstName,
    'lastname': fakeLastName
  }
}

let forgotpassword = {
  'forgotpassword': {
    'date_created': fulldate, 
    'email': fakeFirstName + id,
    'emailprefix': "@mailinator.com",
    'newpassword': input.signup.password,
    'primaryorg': input.signup.primaryorg,
    'correspondence': fakerCorrespondence,
    'firstname': fakeFirstName,
    'lastname': fakeLastName
  }
}

fs.writeFileSync('./test-data/userdata.json', JSON.stringify(data), (err) => { //@test json
  if(err){
    //console.log(err);
  }
})

fs.writeFileSync('./test-data/forgotpassword.json', JSON.stringify(forgotpassword), (err) => { //@test json
  if(err){
    //console.log(err);
  }
})

describe('Register User | Work item #1873 ', () => { //Test Suite

  beforeAll(() => {
    browser.get(process.env.TEST_URL + '/register')
    browser.manage().window().maximize()
  })

  beforeEach(() => { //Before Method
    //console.log('Call fetch api here..')
  })

  afterEach(() => {
    browser.sleep(10000)
  })

  it('should register accounts', async () => { //@test
    let email = element(by.name("email"))
    let password = element(by.name("password"))
    let confirmpassword = element(by.name("confirm-password"))
    let primaryorg = element(by.name("primary-org"))
    let correspondence = element(by.name("Correspondence"))
    let fname = element(by.name("first-name"))
    let lname = element(by.name("last-name"))
    let button = element(by.buttonText("Sign Up"))
    let okBtn = element(by.buttonText("OK"))

    service.elementReadyCheck('email', 'name', 2, EC_Default, EC_Default)
    email.sendKeys(fakeFirstName + id + "@mailinator.com") // Fill up email address Field
    
    //Prompt Select Between Existing Organization or Custom Organization
    service.elementReadyCheck('password', 'name', 2, EC_Default, EC_Default)
    password.click()


    await okBtn.isPresent().then((exist) => {
      if (exist){
        service.elementReadyCheck('OK', 'buttonText', 2, EC_Default, EC_Default)
        okBtn.click() // Choose Existing Organization

        password.clear().sendKeys(input.signup.password) // Fill up password Field

        service.elementReadyCheck('confirm-password', 'name', 2, EC_Default, EC_Default)
        confirmpassword.sendKeys(input.signup.password) // Fill up confirm password Field

      }else{
        password.clear().sendKeys(input.signup.password) // Fill up password Field

        service.elementReadyCheck('confirm-password', 'name', 2, EC_Default, EC_Default)
        confirmpassword.sendKeys(input.signup.password) // Fill up confirm password Field

        service.elementReadyCheck('primary-org', 'name', 2, EC_Default, EC_Default)
        primaryorg.sendKeys(input.signup.primaryorg) // Fill up organization Field
      }
    })

    
    service.elementReadyCheck('Correspondence', 'name', 2, EC_Default, EC_Default)
    correspondence.sendKeys(fakerCorrespondence) // Fill up correspondence Field

    service.elementReadyCheck('first-name', 'name', 2, EC_Default, EC_Default)
    fname.sendKeys(fakeFirstName) // Fill up first name Field

    service.elementReadyCheck('last-name', 'name', 2, EC_Default, EC_Default)
    lname.sendKeys(fakeLastName) // Fill up last name Field

    service.elementReadyCheck('Sign Up', 'buttonText', 2, EC_Default, EC_Default)
    button.click() // Click Sign up button

    service.elementReadyCheck('OK', 'buttonText', 2, EC_Default, EC_Default)
    okBtn.click() // Click First confirmation button


    let dialogContent = element(by.id('swal2-title'))
    let succesDialog = element(by.css('.swal2-icon-success'))

    service.elementReadyCheck('swal2-title', 'id', 2, EC_Default, EC_Default)
    expect(dialogContent.getText()).toEqual('Confirmation') //Expect Dialog to have Confirmation MSG

    service.elementReadyCheck('.swal2-icon-success', 'css', 2, EC_Default, EC_Default)
    expect(succesDialog.isPresent()).toBe(true); //Expect Dialog to be success

    service.elementReadyCheck('/html/body/div/div/div[3]/button[1]', 'xpath', 2, EC_Default, EC_Default)
    element(by.xpath('/html/body/div/div/div[3]/button[1]')).click() // Click Second confirmation button
  })
})
