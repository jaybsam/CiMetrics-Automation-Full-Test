require('dotenv').config()
const { browser, element } = require('protractor')
const data = require("../../test-data/application.json")
const service = require("../../services/ExpectedConditionService.js")
const fs = require("fs");

const EC_Default = 550;

const navigate_to_reporting = (tableIndex) => {
  let reporting_btn = element(by.xpath('//app-main-menu/nb-card/nb-card-body/nb-tabset/nb-tab[2]/ngx-datatable/div/datatable-body/' + 'datatable-selection/datatable-scroller/datatable-row-wrapper[' + tableIndex[0] + ']/datatable-body-row/div[2]/datatable-body-cell[6]/div/button'))
  var loader = element(by.xpath('//app-root/nb-layout/div[2]/div[1]'))

  service.elementChecker(reporting_btn, 2, EC_Default, EC_Default)
  reporting_btn.click() // Click Reporting Button in Reports due tab
  service.waitForLoader(loader) // Check if loader exist/wait to finish
}

const fill_project_scope = () => {
  let unduplicated_input = element(by.xpath('//app-reporting-project-scope/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div[1]/nb-card/nb-card-body/div/div[2]/div/div[1]/input'))
  let encounters_input = element(by.xpath('//app-reporting-project-scope/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[2]/div/div[1]/input'))

  service.elementChecker(unduplicated_input, 2, EC_Default, EC_Default)
  unduplicated_input.clear().sendKeys(autoGenerateRandomNum()) // Fill up unduplicated individuals 1 to 6 months

  service.elementChecker(encounters_input, 2, EC_Default, EC_Default)
  encounters_input.clear().sendKeys(autoGenerateRandomNum()) // Fill up encounters 1 to 6 months
}

const fill_common_measure = () => {
  let home_slot_input = element(by.xpath('//app-reporting-common-measure/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div/nb-card/nb-card-body/div/div[1]/div/div[1]/input'))

  home_slot_input.isPresent().then((exist) => {
    if (exist){
      service.elementChecker(home_slot_input, 2, EC_Default, EC_Default)
      home_slot_input.clear().sendKeys(autoGenerateRandomNum()) // Fill up Count of home visiting slots 1 to 6 months
    }
  })
  
}


const fill_unique_measure = () => {
  let outpt_measure_input = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div[1]/nb-card/nb-card-body/div/div[1]/div/div[1]/input'))
  let outcome_description = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[1]/div[2]/div[2]/input'))
  let date_achieved = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item/nb-accordion-item-body/div/div/div/div[3]/nb-card/nb-card-body/div/div[2]/input'))
  let user_profile = element(by.css('.user-name'))

  service.elementChecker(outpt_measure_input, 2, EC_Default, EC_Default)
  outpt_measure_input.clear().sendKeys(autoGenerateRandomNum()) // Fill up updated output measure 1 to 6 months

  service.elementChecker(outcome_description, 2, EC_Default, EC_Default)
  outcome_description.clear().sendKeys(autoGenerateRandomNum()) // Fill up outcome description 1 to 6 months

  service.elementChecker(date_achieved, 2, EC_Default, EC_Default)
  date_achieved.clear().sendKeys('Jun 17, 2022') // Fill up date achieved

  service.elementChecker(user_profile, 2, EC_Default, EC_Default)
  user_profile.click() //
}

const fill_narative = async () => {
  
}

const proceed_to_next = () => {
  var loader = element(by.xpath('//app-root/nb-layout/div[2]/div[1]'))
  var nextBtn = element(by.buttonText('next'))

  service.elementChecker(nextBtn, 2, EC_Default, EC_Default)
  nextBtn.click() // Click next
  service.waitForLoader(loader) // Check if loader exist/wait to finish
}

const submit_reporting = (loader) => {
  var loader = element(by.xpath('//app-root/nb-layout/div[2]/div[1]'))
  var submit_btn = element(by.buttonText('Submit Report'))

  service.elementChecker(submit_btn, 2, EC_Default, EC_Default)
  submit_btn.click().then(() => { // Click submit

    service.elementChecker(submit_btn, 2, EC_Default, EC_Default)
    element(by.buttonText('OK')).click() // Confirm Submit
    service.waitForLoader(loader) // Check if loader exist/wait to finish
  })
}

var autoGenerateText = function () {
  var autoGenerateTitle = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 4; i++)
    autoGenerateTitle += possible.charAt(Math.floor(Math.random() * possible.length));
  return autoGenerateTitle;
};

var autoGenerateRandomNum = function () {
  return Math.floor((Math.random() * 5) + 1)
}


describe('Validate Application Status | Continuation: Work Item #1909', () => {
  var originalTimeout;

  beforeAll(() => {
    //console.log("Test: Submit Due Report")
  })

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  })

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    browser.sleep(10000)
  })

  it('should edit/submit assigned report', async () => {
    let loader = element(by.xpath('//app-root/nb-layout/div[2]/div[1]'))
    let tableIndex = []
    browser.sleep(5000)

    let reports_due_tab = element(by.xpath('//app-main-menu/nb-card/nb-card-body/nb-tabset/ul/li[2]'))

    service.elementChecker(reports_due_tab, 2, EC_Default, EC_Default)
    reports_due_tab.click() // Click Reports Due Tab

    let project = element.all(by.css('.content-active > .ngx-datatable > div > .datatable-body > datatable-selection > datatable-scroller > .datatable-row-wrapper'))

    service.elementChecker(project, 1, EC_Default, EC_Default)
    await project.each(async (row, index) => { // Find Recent Created Goal Application Report
      let tableRows = row.$$('.datatable-body-row > div:nth-child(2) > .datatable-body-cell:nth-child(1) > .datatable-body-cell-label > span')
      let projectTitle = await tableRows.get(0).getText()
      if (projectTitle === data.edit_application.projectTitle_input) {
        tableIndex.push(index + 1)
      }
    })

    navigate_to_reporting(tableIndex)

    fill_project_scope() // Fill project scope forms
    proceed_to_next()

    fill_common_measure() // Fill common measure forms
    proceed_to_next()

    fill_unique_measure() // Fill unique measure forms
    proceed_to_next()

    // for(let i = 1; i <= 4; i++){
    //   var textarea = element(by.xpath(`//app-reporting-narritive/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/nb-card[${i}]/nb-card-body/div/textarea[1]`))
    //   service.elementChecker(textarea, 1, EC_Default, EC_Default)
    //   textarea.clear().sendKeys(autoGenerateText())
    // }

    element.all(by.css('nb-accordion-item:nth-child(1) > nb-accordion-item-body > div > div > nb-accordion > nb-accordion-item:nth-child(1) > nb-accordion-item-body > div >div > nb-card')).each(async (row1, index1) => {
      var textAreaElem = row1.$$('nb-card-body > div > textarea')
      textAreaElem.clear().sendKeys(autoGenerateText())
    })

    proceed_to_next()
    proceed_to_next()
    proceed_to_next()

    submit_reporting() // Submit reporting
  })

  // it('should check submitted report to be complete', async () => {
  //   service.waitForLoader(1)
  //   let loader = element(by.xpath('//app-root/nb-layout/div[2]/div[1]'))
  //   let allrecords_tab = element(by.xpath('//app-main-menu/nb-card/nb-card-body/nb-tabset/ul/li[5]'))

  //   service.elementChecker(allrecords_tab, 2, EC_Default, EC_Default)
  //   allrecords_tab.click() // Click All records tab
  //   service.waitForLoader(1) // Check if loader exist/wait to finish

  //   browser.sleep(5000)
  //   var nth_child = []
  //   var expectedResult;

  //   await element.all(by.css('.content-active > .ngx-datatable > div > .datatable-body > datatable-selection > datatable-scroller > .datatable-row-wrapper')).each(async (row, index) => {
  //     let tableRows = row.$$('.datatable-body-row > div:nth-child(2) > .datatable-body-cell:nth-child(1) > .datatable-body-cell-label > span')
  //     let projectTitle = await tableRows.get(0).getText()
  //     if (projectTitle === data.edit_application.projectTitle_input) {
  //       nth_child.push(index + 1)
  //       expectedResult = projectTitle
  //     }
  //   })
  //   browser.sleep(3000)
  //   let verifyData = element(by.xpath('//app-main-menu/nb-card/nb-card-body/nb-tabset/nb-tab[5]/ngx-datatable/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper[' + nth_child + ']/datatable-body-row/div[2]/datatable-body-cell[1]'))
  //   let checkComplete = await verifyData.getText()
  //   browser.sleep(3000)
  //   expect(checkComplete).toBe(expectedResult)
  // })
})

