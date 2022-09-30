require('dotenv').config()
const { browser, element } = require('protractor')
const user = require('../../test-data/userdata.json')
const data = require("../../test-data/application.json")
const WordExtractor = require("word-extractor"); 
const fs = require('fs')
const path = require('path')
const service = require("../../services/ExpectedConditionService.js")

const EC_Default = 250;

const extractor = new WordExtractor();

const readdirAsync = (path) => {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

describe('Report Application can be downloaded by partner | Work Item #1921', () => {
  var originalTimeout;
  var fileContent = "";

  beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  })

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    browser.sleep(5000)
  })
  it('should navigate to all records tab', async () => {
    url = process.env.TEST_URL + '/main-menu'
    browser.get(url)

    service.elementReadyCheck(url, 'urlIs', 3, EC_Default, EC_Default)

    service.waitForLoader(1)
    service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish

    let allApplicationTab = element(by.xpath('//app-main-menu/nb-card/nb-card-body/nb-tabset/ul/li[5]'))
    service.elementChecker(allApplicationTab, 2, EC_Default, EC_Default)
    allApplicationTab.click() // Click All Record Tab

    service.waitForLoader(1)
    service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish

    let tableIndex = []

    //Should Find the created application from table
    service.elementReadyCheck('.content-active > .ngx-datatable > div > .datatable-body > datatable-selection > datatable-scroller > .datatable-row-wrapper', 'css', 1, EC_Default, EC_Default)
    await element.all(by.css('.content-active > .ngx-datatable > div > .datatable-body > datatable-selection > datatable-scroller > .datatable-row-wrapper')).each(async (row, key) => {

      let tableRows = row.$$('.datatable-body-row > div:nth-child(2) > .datatable-body-cell:nth-child(1) > .datatable-body-cell-label > span')
      let projectTitle = await tableRows.get(0).getText()

      if(projectTitle === data.edit_application.projectTitle_input){
        tableIndex.push(key + 1)
      }
    })

    let summaryBtn = element(by.xpath(`//app-main-menu/nb-card/nb-card-body/nb-tabset/nb-tab[5]/ngx-datatable/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper[${tableIndex[0]}]/datatable-body-row/div[2]/datatable-body-cell[5]/div/div/button[1]`))
    service.elementChecker(summaryBtn, 2, EC_Default, EC_Default)
    summaryBtn.click() // Click View Report Summary Icon Btn
    
    service.waitBackdropOverlay(element(by.css('.cdk-overlay-container > div:nth-child(3)')))
    
    let downloadBtn = element(by.buttonText('Download'))
    service.elementChecker(downloadBtn, 2, 5000, EC_Default)

    // browser.actions().mouseMove(downloadBtn).perform()
    // browser.actions().doubleClick(downloadBtn).perform()

    downloadBtn.click() // Click Download Button

    service.waitBackdropOverlay(element(by.css('.cdk-overlay-container > div:nth-child(3)'))) // Wait For Overlay to Finish

    browser.sleep(5000)
  })
})

