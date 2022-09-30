const admin_user = require("../../test-data/admindata.json")
const service = require("../../services/ExpectedConditionService.js")
const data = require("../../test-data/application.json");
const { browser } = require("protractor");

require('dotenv').config()

const EC_Default = 550;

const loginAsAdmin = () => {
  browser.get(process.env.TEST_URL + '/login')

  service.waitForLoader(1)

  let anchorLink = element(by.cssContainingText('a', 'Login As Admin'))
  service.elementChecker(anchorLink, 2, EC_Default, EC_Default)
  anchorLink.click()

  service.waitForLoader(1)
  service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish

  element(by.name('loginfmt')).isPresent().then((exist) => {
    if (exist){
      let email = element(by.name('loginfmt'))  
      let button = element(by.id('idSIButton9'))
      
      service.elementChecker(email, 2, EC_Default, EC_Default)
      email.sendKeys(admin_user.login.email)

      service.elementChecker(button, 2, EC_Default, EC_Default)
      button.click()
          
      let password = element(by.name("passwd"))
      service.elementChecker(password, 2, EC_Default, EC_Default)
      password.sendKeys(admin_user.login.password)
      
      
      service.elementChecker(button, 2, EC_Default, EC_Default)
      button.click() // Microsoft Enter Password -Signin

      service.elementChecker(button, 2, EC_Default, EC_Default)
      button.click() // Stay signed in? click yes
    }
  })
}

const keywordSearch = () => {
  service.waitForLoader(1)
  service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish
  
  let progressReport = element(by.xpath('//nb-route-tabset/ul/li[2]'))
  service.elementChecker(progressReport, 2, EC_Default, EC_Default)
  progressReport.click() //Progress report tab

  service.waitForLoader(1)
  service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for loader to finish

  let searchBar = element(by.xpath('//app-progress-report/div/div/div[3]/nb-form-field/div/input')) 
  service.elementChecker(searchBar, 2, EC_Default, EC_Default)
  searchBar.clear().sendKeys(data.edit_application.matchId) // Keyword search for matchId
}

const logoutAsPartner = () => {
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
}

const logoutAsAdmin = () => {
  service.waitForLoader(1) // Wait for loader to finish
  service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for Backdrop dim to finish
  
  service.elementReadyCheck('.user-name', 'css', 2, EC_Default, EC_Default)
  element(by.css('.user-name')).click()
  
  browser.sleep(2000)

  service.elementReadyCheck('//app-root/nb-layout/div[2]/div/div/nb-context-menu/nb-menu/ul/li/a', 'xpath', 2, EC_Default, EC_Default)
  element(by.xpath('//app-root/nb-layout/div[2]/div/div/nb-context-menu/nb-menu/ul/li/a')).click()
}

const openReportingPeriod = (label) => {
  let editIconBtn = element(by.xpath('//datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[11]/div/button[3]'))
  service.elementChecker(editIconBtn, 2, EC_Default, EC_Default)
  editIconBtn.click()

  let reportingPeriod = element(by.buttonText('Open Reporting Period'))
  service.elementChecker(reportingPeriod, 2, EC_Default, EC_Default)
  reportingPeriod.click()

  let selectReporting = element(by.xpath("/html/body/app-root/nb-layout/div[1]/div/div/div/div/nb-layout-column/div/div/app-admin/nb-layout/div[2]/div[4]/div/nb-dialog-container/app-open-reporting-period/nb-card/nb-card-body/div/div/nb-select"))
  service.elementChecker(selectReporting, 2, EC_Default, EC_Default)
  selectReporting.click()

  let selectReportOption =  element(by.cssContainingText('nb-option', label))
  service.elementChecker(selectReportOption, 2, EC_Default, EC_Default)
  selectReportOption.click() 

  let openBtn = element(by.buttonText('Open'))
  service.elementChecker(openBtn, 2, EC_Default, EC_Default)
  openBtn.click()

  service.waitForLoader(1) // Wait for loader to finish
  service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for Backdrop dim to finish

  let closeBtn = element(by.xpath('//app-edit-progress-report/nb-card/nb-card-footer/button'))
  service.elementChecker(closeBtn, 2, EC_Default, EC_Default)
  closeBtn.click()
}

const submitDueReport = (label) => {

  service.waitForLoader(1) // Wait for loader to finish
  service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for Backdrop dim to finish
  
  let reportingButton = element(by.buttonText('Reporting'))
  service.elementChecker(reportingButton, 2, EC_Default, EC_Default)
  reportingButton.click()

  service.waitForLoader(1) // Wait for loader to finish
  service.waitBackdropOverlay(element(by.css('.cdk-overlay-backdrop-showing'))) // Wait for Backdrop dim to finish


  switch (label) {
    case 'Period 2 - Year 1' : 
        //Project Scope
          //Year One
            //Unduplicated Individuals
            let firstField = element(by.xpath('//app-reporting-project-scope/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div[1]/nb-card/nb-card-body/div/div[2]/div/div[2]/input'))
            service.elementChecker(firstField, 2, EC_Default, EC_Default)
            firstField.sendKeys('1')
            //Encounters
            let secondField = element(by.xpath('//app-reporting-project-scope/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[2]/div/div[2]/input'))
            service.elementChecker(secondField, 2, EC_Default, EC_Default)
            secondField.sendKeys('1')

            var nextBtn = element(by.buttonText('next'))
            service.elementChecker(nextBtn, 2, EC_Default, EC_Default)
            nextBtn.click()

            service.waitForLoader(1) // Wait for loader to finish

        //Common measure
          //Year one
            //Number of new relationships between participants
            let thirdField = element(by.xpath('//app-reporting-common-measure/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div/nb-card/nb-card-body/div/div[1]/div/div[2]/input'))
            service.elementChecker(thirdField, 2, EC_Default, EC_Default)
            thirdField.sendKeys('1')

            nextBtn.click()
            service.waitForLoader(1) // Wait for loader to finish


        //Unique measure
          //Year one
            //recusandae quis id dolor excepturi fugit repellendus tempora itaque fugiat
            let fourthField = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div[1]/nb-card/nb-card-body/div/div[1]/div/div[2]/input'))
            service.elementChecker(fourthField, 2, EC_Default, EC_Default)
            fourthField.sendKeys('1')

            //et voluptas ipsam eius consectetur fugiat quidem et sed dolores
            let fifthField = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[1]/div[3]/div[2]/input'))
            service.elementChecker(fifthField, 2, EC_Default, EC_Default)
            fifthField.sendKeys('1')

            let sixthField = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[1]/div[3]/div[3]/input'))
            service.elementChecker(sixthField, 2, EC_Default, EC_Default)
            sixthField.sendKeys('1')

            //asperiores dolore pariatur amet asperiores quasi voluptatem a fugit magnam
            let selectMilestone = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div/div[3]/nb-card/nb-card-body/div/div[1]/nb-select'))
            service.elementChecker(selectMilestone, 2, EC_Default, EC_Default)
            selectMilestone.click()

            let selectMilestoneOption = element(by.cssContainingText('nb-option', 'Yes'))
            service.elementChecker(selectMilestone, 2, EC_Default, EC_Default)
            selectMilestoneOption.click()

            nextBtn.click()
            service.waitForLoader(1) // Wait for loader to finish

        //Narative
          //Year one
            //Year One - Reporting Period 2 Narrative Responses
            for(let i = 1; i <= 4; i++){
              var narratives = element(by.xpath(`//app-reporting-narritive/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/nb-card[${i}]/nb-card-body/div/textarea`))
              service.elementChecker(narratives, 2, EC_Default, EC_Default)
              narratives.sendKeys('This is a sample narrative text...')
            }

            nextBtn.click()
            service.waitForLoader(1) // Wait for loader to finish

       //Budget
          //Reporting Period 1 BUDGET TO ACTUAL ATTACHMENT
            nextBtn.click()
            service.waitForLoader(1) // Wait for loader to finish
      //Other Attachment
            nextBtn.click()
            service.waitForLoader(1) // Wait for loader to finish
      //Demographic
          //Year one
            //Race Ethnicity
            let hispanicLatino = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[1]/div[1]/nb-card/nb-card-body/div/div[1]/input'))
            service.elementChecker(hispanicLatino, 2, EC_Default, EC_Default)
            hispanicLatino.sendKeys('1')
            
            let africanAmerican = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[1]/div[1]/nb-card/nb-card-body/div/div[2]/input'))
            service.elementChecker(africanAmerican, 2, EC_Default, EC_Default)
            africanAmerican.sendKeys('1')

            //Gender identity
            let male = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[1]/div[2]/nb-card/nb-card-body/div/div[1]/input'))
            service.elementChecker(male, 2, EC_Default, EC_Default)
            male.sendKeys('1')

            let female = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[1]/div[2]/nb-card/nb-card-body/div/div[2]/input'))
            service.elementChecker(female, 2, EC_Default, EC_Default)
            female.sendKeys('1')
            

            //Age
            let above18 = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[1]/div[3]/nb-card/nb-card-body/div/div[3]/input'))
            service.elementChecker(above18, 2, EC_Default, EC_Default)
            above18.sendKeys('1')

            let above55 = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[1]/div[3]/nb-card/nb-card-body/div/div[3]/input'))
            service.elementChecker(above55, 2, EC_Default, EC_Default)
            above55.sendKeys('1')

            //County
            let bastropField = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[2]/div[1]/nb-card/nb-card-body/div/div[1]/input'))
            service.elementChecker(bastropField, 2, EC_Default, EC_Default)
            bastropField.sendKeys('1')

            let caldwellField = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[2]/div[1]/nb-card/nb-card-body/div/div[2]/input'))
            service.elementChecker(caldwellField, 2, EC_Default, EC_Default)
            caldwellField.sendKeys('1')

            //Percent of Federal Poverty Level (FPL)
            let unknownField = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[2]/div[2]/nb-card/nb-card-body/div[1]/div[5]/input'))
            service.elementChecker(unknownField, 2, EC_Default, EC_Default)
            unknownField.sendKeys('1')

            let oneHundredPercent = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[2]/div[2]/nb-card/nb-card-body/div[1]/div[1]/input'))
            service.elementChecker(oneHundredPercent, 2, EC_Default, EC_Default)
            oneHundredPercent.sendKeys('1')

            let fplDescription = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/div[2]/div[2]/nb-card/nb-card-body/div[2]/div/div/textarea'))
            service.elementChecker(fplDescription, 2, EC_Default, EC_Default)
            fplDescription.sendKeys('This is a sample fpl description...')

            nextBtn.click()
            service.waitForLoader(1) // Wait for loader to finish

    var submitReport = element(by.buttonText('Submit Report'))
    service.elementChecker(submitReport, 2, EC_Default, EC_Default)
    submitReport.click() // Click submit report Period 2 Year 2

    service.waitForLoader(1) // Wait for loader to finish

    var okBtn = element(by.buttonText('OK'))
    service.elementChecker(okBtn, 2, EC_Default, EC_Default)
    okBtn.click()
    
    service.waitForLoader(1) // Wait for loader to finish
    break;

    case 'Period 1 - Year 2' : 
      //Project scope
            //Year one
              //Unduplicated Individuals
              let unduplicated_months = element(by.xpath('//app-reporting-project-scope/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div[1]/nb-card/nb-card-body/div/div[2]/div/div[1]/input'))
              service.elementChecker(unduplicated_months, 2, EC_Default, EC_Default)
              unduplicated_months.sendKeys('1')

              //Encounters
              let encounter_months = element(by.xpath('//app-reporting-project-scope/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[2]/div/div[1]/input'))
              service.elementChecker(encounter_months, 2, EC_Default, EC_Default)
              encounter_months.sendKeys('1')

              var nextBtn = element(by.buttonText('next'))
              service.elementChecker(nextBtn, 2, EC_Default, EC_Default)

              nextBtn.click()
              service.waitForLoader(1) // Wait for loader to finish

      //Common measure
            //Year two
              //Number of new relationships between participants created
              
              let relation_field = element(by.xpath('//app-reporting-common-measure/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div/nb-card/nb-card-body/div/div[1]/div/div[1]/input'))
              service.elementChecker(relation_field, 2, EC_Default, EC_Default)
              relation_field.sendKeys('1')

              nextBtn.click()
              service.waitForLoader(1) // Wait for loader to finish
      
      //Unique measure
            //Year two
              //recusandae quis id dolor excepturi fugit repellendus tempora itaque fugiat
              let temp_field = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div[1]/nb-card/nb-card-body/div/div[1]/div/div[1]/input'))
              service.elementChecker(temp_field, 2, EC_Default, EC_Default)
              temp_field.sendKeys('1')

              //et voluptas ipsam eius consectetur fugiat quidem et sed dolores
              let avg = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[1]/div[2]/div[2]/input'))
              service.elementChecker(avg, 2, EC_Default, EC_Default)
              avg.sendKeys('1')

              let avg2 = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[1]/div[2]/div[3]/input'))
              service.elementChecker(avg2, 2, EC_Default, EC_Default)
              avg2.sendKeys('1')

              nextBtn.click()
              service.waitForLoader(1) // Wait for loader to finish

        //Narrative
            //Year two
              //Year Two - Reporting Period 1 Narrative Responses
              for(let i = 1; i <= 4; i++){
                var narratives = element(by.xpath(`//app-reporting-narritive/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/nb-accordion/nb-accordion-item[1]/nb-accordion-item-body/div/div/nb-card[${i}]/nb-card-body/div/textarea`))
                service.elementChecker(narratives, 2, EC_Default, EC_Default)
                narratives.sendKeys('This is a sample narrative text...')
              }

        //Budget
          //Reporting Period 1 BUDGET TO ACTUAL ATTACHMENT
              nextBtn.click()
              service.waitForLoader(1) // Wait for loader to finish
              
        //Other Attachment
              nextBtn.click()
              service.waitForLoader(1) // Wait for loader to finish
 
    var submitReport = element(by.buttonText('Submit Report'))
    service.elementChecker(submitReport, 2, EC_Default, EC_Default)
    submitReport.click() // Click submit report Period 2 Year 2

    service.waitForLoader(1) // Wait for loader to finish

    var okBtn = element(by.buttonText('OK'))
    service.elementChecker(okBtn, 2, EC_Default, EC_Default)
    okBtn.click()

    service.waitForLoader(1) // Wait for loader to finish

    break;
    case 'Period 2 - Year 2' : 
        //Project scope
            //Year two
              //Unduplicated Individuals
              let unduplicated_months_2 = element(by.xpath('//app-reporting-project-scope/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div[1]/nb-card/nb-card-body/div/div[2]/div/div[2]/input'))
              service.elementChecker(unduplicated_months_2, 2, EC_Default, EC_Default)
              unduplicated_months_2.sendKeys('1')

              //Encounters
              let encounters_months_2 = element(by.xpath('//app-reporting-project-scope/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[2]/div/div[2]/input'))
              service.elementChecker(encounters_months_2, 2, EC_Default, EC_Default)
              encounters_months_2.sendKeys('1')

              var nextBtn = element(by.buttonText('next'))
              service.elementChecker(nextBtn, 2, EC_Default, EC_Default)

              nextBtn.click()
              service.waitForLoader(1) // Wait for loader to finish
        //Common measure
            //Year two
              //Number of new relationships between participants created
              let relation_field_2 = element(by.xpath('//app-reporting-common-measure/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div/nb-card/nb-card-body/div/div[1]/div/div[2]/input'))
              service.elementChecker(relation_field_2, 2, EC_Default, EC_Default)
              relation_field_2.sendKeys('1')
              
              nextBtn.click()
              service.waitForLoader(1) // Wait for loader to finish

        //Unique measure
              //Year two
                //recusandae quis id dolor excepturi fugit repellendus tempora itaque fugiat
                let temp_field_2 = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div[1]/nb-card/nb-card-body/div/div[1]/div/div[2]/input'))
                service.elementChecker(temp_field_2, 2, EC_Default, EC_Default)
                temp_field_2.sendKeys('1')

                //et voluptas ipsam eius consectetur fugiat quidem et sed dolores
                let avg_field = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[1]/div[3]/div[2]/input'))
                service.elementChecker(avg_field, 2, EC_Default, EC_Default)
                avg_field.sendKeys('1')

                let avg_field_2 = element(by.xpath('//app-reporting-unique-measure/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div/div[2]/nb-card/nb-card-body/div/div[1]/div[3]/div[3]/input'))
                service.elementChecker(avg_field_2, 2, EC_Default, EC_Default)
                avg_field_2.sendKeys('1')

                nextBtn.click()
                service.waitForLoader(1) // Wait for loader to finish

          //Narrative
              //Year two
                  //Year Two - Reporting Period 1 Narrative Responses
                  for(let i = 1; i <= 4; i++){
                    var narratives = element(by.xpath(`//app-reporting-narritive/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/nb-card[${i}]/nb-card-body/div/textarea`))
                    service.elementChecker(narratives, 2, EC_Default, EC_Default)
                    narratives.sendKeys('This is a sample narrative text...')
                  }

            //Budget
              //Reporting Period 1 BUDGET TO ACTUAL ATTACHMENT
                  nextBtn.click()
                  service.waitForLoader(1) // Wait for loader to finish
                  
              //Other Attachment
                  nextBtn.click()
                  service.waitForLoader(1) // Wait for loader to finish

          //Demographic
                //Year two
                  //Race/Ethnicity
                  let hispanicLatino_field = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[1]/div[1]/nb-card/nb-card-body/div/div[1]/input'))
                  service.elementChecker(hispanicLatino_field, 2, EC_Default, EC_Default)
                  hispanicLatino_field.sendKeys('1')

                  let africanAmerican_field = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[1]/div[1]/nb-card/nb-card-body/div/div[2]/input'))
                  service.elementChecker(africanAmerican_field, 2, EC_Default, EC_Default)
                  africanAmerican_field.sendKeys('1')

                  //Gender Identity
                  let male_field = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[1]/div[2]/nb-card/nb-card-body/div/div[1]/input'))
                  service.elementChecker(male_field, 2, EC_Default, EC_Default)
                  male_field.sendKeys('1')

                  let female_field = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[1]/div[2]/nb-card/nb-card-body/div/div[2]/input'))
                  service.elementChecker(female_field, 2, EC_Default, EC_Default)
                  female_field.sendKeys('1')


                  //Age
                  let above18_field = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[1]/div[3]/nb-card/nb-card-body/div/div[3]/input'))
                  service.elementChecker(above18_field, 2, EC_Default, EC_Default)
                  above18_field.sendKeys('1')


                  let above55_field = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[1]/div[3]/nb-card/nb-card-body/div/div[4]/input'))
                  service.elementChecker(above55_field, 2, EC_Default, EC_Default)
                  above55_field.sendKeys('1')


                  //County
                  let bastrop = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[2]/div[1]/nb-card/nb-card-body/div/div[1]/input'))
                  service.elementChecker(bastrop, 2, EC_Default, EC_Default)
                  bastrop.sendKeys('1')

                  let caldwell = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[2]/div[1]/nb-card/nb-card-body/div/div[2]/input'))
                  service.elementChecker(caldwell, 2, EC_Default, EC_Default)
                  caldwell.sendKeys('1')


                  //Percent of Federal Poverty Level (FPL)
                  let unknown = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[2]/div[2]/nb-card/nb-card-body/div[1]/div[5]/input'))
                  service.elementChecker(unknown, 2 ,EC_Default, EC_Default)
                  unknown.sendKeys('1')

                  let oneHundredPercent_field = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[2]/div[2]/nb-card/nb-card-body/div[1]/div[1]/input'))
                  service.elementChecker(oneHundredPercent_field, 2, EC_Default, EC_Default)
                  oneHundredPercent_field.sendKeys('1')

                  let fplDescription_field = element(by.xpath('//app-reporting-demographic/nb-accordion/nb-accordion-item[2]/nb-accordion-item-body/div/div/div[2]/div[2]/nb-card/nb-card-body/div[2]/div/div/textarea'))
                  service.elementChecker(fplDescription_field, 2, EC_Default, EC_Default)
                  fplDescription_field.sendKeys('This is a sample FPL description...')

                  nextBtn.click()
                  service.waitForLoader(1) // Wait for loader to finish
                  
    var submitReport = element(by.buttonText('Submit Report'))
    service.elementChecker(submitReport, 2, EC_Default, EC_Default)
    submitReport.click() // Click submit report Period 2 Year 2

    service.waitForLoader(1) // Wait for loader to finish

    var okBtn = element(by.buttonText('OK'))
    service.elementChecker(okBtn, 2, EC_Default, EC_Default)
    okBtn.click()

    service.waitForLoader(1) // Wait for loader to finish
    break;
    case 'Period 1 - Year 3' : 

    break;
    case 'Period 2 - Year 3' : 

    break;
    case 'Period 1 - Year 4' : 

    break;
    case 'Period 2 - Year 4' : 

    break;
  }
  
  
}

describe('Final Application Report', () => {
    var originalTimeout;

    beforeAll(() => {
        browser.waitForAngularEnabled(false)
    })

    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    })

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        browser.sleep(5000)
    })

    it('should finish all application reports', async () => {
        data.reporting.forEach((report, key) => {
          if(report.status == 0){
            let result = false;
            browser.call(() => {console.log(report.label)}, result);
            logoutAsPartner() // logout partner account
            loginAsAdmin() //  login admin account
            keywordSearch() // Search for applications matchId
            let openreportPeriod = openReportingPeriod(report.label) // Open Report Period / Update Report Period Status
            logoutAsAdmin() // logout from admin account

            submitDueReport(report.label)

            browser.call(() => {console.log("Test: Open Report Period")}, openreportPeriod)
          }
        })
    })
})