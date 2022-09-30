require('dotenv').config()
const { browser, element } = require('protractor')
const data = require("../../test-data/application.json")
const WordExtractor = require("word-extractor");
const path = require('path')
const service = require("../../services/ExpectedConditionService.js")

const EC_Default = 550;

const extractor = new WordExtractor();

describe('Continuation: Validate Application can be downloaded by partner | ', () => {
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
    it('should parse downloaded report file data', async () => {
        browser.sleep(3000)
        var inputPath;
        switch (data.edit_application.grantTerm_select) {
            case '6 Months':
                inputPath = path.resolve(__dirname, '../../downloads/Grant Report-1-' + data.edit_application.projectTitle_input + ".docx")
                break;
            default:
                inputPath = path.resolve(__dirname, '../../downloads/Grant Report-2-' + data.edit_application.projectTitle_input + ".docx")
                break;
        }
        
        const extracted = await extractor.extract(inputPath);
        fileContent = extracted.getBody()
    })

    it('should check actual data to match the downloaded report file', async () => {
        url = process.env.TEST_URL + '/main-menu'
        browser.get(url)

        service.waitForLoader(1)
        service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish


        let allRecordTab = element(by.xpath('//app-main-menu/nb-card/nb-card-body/nb-tabset/ul/li[5]'))
        service.elementChecker(allRecordTab, 2, EC_Default, EC_Default)
        allRecordTab.click() // Click All records Tab

        service.waitForLoader(1)
        service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish

        var tableIndex = []

        //Find created application
        service.elementReadyCheck('.content-active > .ngx-datatable > div > .datatable-body > datatable-selection > datatable-scroller > .datatable-row-wrapper', 'css', 1, EC_Default, EC_Default)
        await element.all(by.css('.content-active > .ngx-datatable > div > .datatable-body > datatable-selection > datatable-scroller > .datatable-row-wrapper')).each(async (row, key) => {

            let tableRows = row.$$('.datatable-body-row > div:nth-child(2) > .datatable-body-cell:nth-child(1) > .datatable-body-cell-label > span')
            let projectTitle = await tableRows.get(0).getText()

            if (projectTitle === data.edit_application.projectTitle_input) {
                tableIndex.push(key + 1)
            }
        })

        browser.sleep(3000)

        let viewGoalsBtn = element(by.xpath('//app-main-menu/nb-card/nb-card-body/nb-tabset/nb-tab[5]/ngx-datatable/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper[' + tableIndex[0] + ']/datatable-body-row/div[2]/datatable-body-cell[4]/div/button[1]'))
        service.elementChecker(viewGoalsBtn, 2, EC_Default, EC_Default)
        viewGoalsBtn.click() // Click View Goals Button

        service.waitForLoader(1)
        service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish


        let projectTitle = element(by.xpath(data.edit_application.projectTitle))
        service.elementChecker(projectTitle, 2, EC_Default, EC_Default)
        if (fileContent.match(projectTitle.getAttribute('value'))) { // Check from all document if the same project title exists
            expect(true).toBe(true)
        } else {
            expect(false).toBe(true)
        }


        let grantTerm = element(by.xpath(data.edit_application.grantTerm))
        service.elementChecker(grantTerm, 2, EC_Default, EC_Default)
        if (fileContent.match(grantTerm.getAttribute('value'))) { // Check Grant Term Field Value
            expect(true).toBe(true)
        } else {
            expect(false).toBe(true)
        }

        let nextBtn = element(by.buttonText('next'))

        service.elementChecker(nextBtn, 2, EC_Default, EC_Default)
        nextBtn.click() // Click to Proceed

        service.waitForLoader(1)
        service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish

        service.elementChecker(nextBtn, 2, EC_Default, EC_Default)
        nextBtn.click() // Click to Proceed

        service.waitForLoader(1)
        service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish

        service.elementChecker(nextBtn, 2, EC_Default, EC_Default)
        nextBtn.click() // Click to Proceed

        service.waitForLoader(1)
        service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish

        data.edit_application.individuals.goals.forEach((item, key) => { // Check Individual Goal from Downloaded Reports document
            let individualGoal = element(by.xpath(item.goal))
            service.elementChecker(individualGoal, 2, EC_Default, EC_Default)
            if (fileContent.match(individualGoal.getAttribute('value'))) {
                expect(true).toBe(true)
            } else {
                expect(false).toBe(true)
            }
        })

        let individualBrief = element(by.xpath(data.edit_application.individuals.description))
        service.elementChecker(individualBrief, 2, EC_Default, EC_Default)
        if (fileContent.match(individualBrief.getAttribute('value'))) { // Expected Result Value from Brief Field
            expect(true).toBe(true)
        } else {
            expect(false).toBe(true)
        }

        data.edit_application.encounters.goals.forEach((item, key) => { // Check Encounters Goal from Downloaded Document
            let encountersGoal = element(by.xpath(item.goal))
            service.elementChecker(encountersGoal, 2, EC_Default, EC_Default)
            if (fileContent.match(encountersGoal.getAttribute('value'))) {
                expect(true).toBe(true)
            } else {
                expect(false).toBe(true)
            }
        })

        let encountersBrief = element(by.xpath(data.edit_application.encounters.description))
        service.elementChecker(encountersBrief, 2, EC_Default, EC_Default)
        if (fileContent.match(encountersBrief.getAttribute('value'))) { // Expected Result Value from Brief Field
            expect(true).toBe(true)
        } else {
            expect(false).toBe(true)
        }

        data.edit_application.common_measures.goals.forEach((item, key) => { // Check Common Measures Goal from Downloaded Document
            let commonGoal = element(by.xpath(item.goal))
            service.elementChecker(commonGoal, 2, EC_Default, EC_Default)
            if (fileContent.match(commonGoal.getAttribute('value'))) {
                expect(true).toBe(true)
            } else {
                expect(false).toBe(true)
            }
        })

        // let commonBrief = element(by.xpath(data.edit_application.common_measures.description))
        // service.elementChecker(commonBrief, 2, EC_Default, EC_Default)
        // if (fileContent.match(commonBrief.getAttribute('value'))) { // Expected Result Value from Brief Field
        //     expect(true).toBe(true)
        // } else {
        //     expect(false).toBe(true)
        // }

        service.elementChecker(nextBtn, 2, EC_Default, EC_Default)
        nextBtn.click() // Click to Proceed

        service.waitForLoader(1)
        service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish

        let cancelBtn = element(by.buttonText('Cancel'))
        service.elementChecker(cancelBtn, 2, EC_Default, EC_Default)
        cancelBtn.click() // Click Cancel

        service.waitForLoader(1)

        let okBtn = element(by.buttonText('OK'))
        service.elementChecker(okBtn, 2, EC_Default, EC_Default)
        okBtn.click() // Click OK Button

        service.waitForLoader(1)
        service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish
    })
})