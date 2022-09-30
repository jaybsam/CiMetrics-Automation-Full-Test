const HtmlReporter = require('protractor-beautiful-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const path = require('path');
const downloadsPath = path.resolve(__dirname, '../../downloads');

const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const jasmineReporters = require('jasmine-reporters');
const fs = require('fs-extra');

const reports = './reports/Junit';

exports.config = {
    framework: 'jasmine',
    specs: [
        '../register/register.spec.js',
        '../verification/verification.spec.js',
        '../login/authentication.spec.js',
        '../create-grant-report-partner/grant-partner-forms.spec.js',
        '../edit-grant-report-partner/edit-grant-report.spec.js',
        '../download-grant-report-partner/download-report.spec.js', 
        '../logout/logout.spec.js',
        '../admin-side/admin-login/admin-login.spec.js',
        '../download-grant-report-partner/download-report-admin-side.spec.js',
        '../admin-side/validate-application-status/validate-application.spec.js',
        '../admin-side/admin-logout/logout.spec.js',
        '../login/relogin.spec.js',
        '../submit-due-report/submit-due-report.spec.js',
        '../download-completed-application/download-completed-application.spec.js',
        '../download-completed-application/_con_download-completed_application.spec.js',
        '../logout/relogout.spec.js',
        // '../final-report/final-report.spec.js',
        '../admin-side/admin-login/admin-relogin.spec.js',
        '../admin-side/add-user/add-user.spec.js',
        '../admin-side/confirm-users-email/confirm-users-email.spec.js',
        '../admin-side/admin-logout/relogout.spec.js',
        '../admin-side/confirm-users-email/login-partner/login.spec.js',
        '../admin-side/admin-login/admin-reset-password-login.spec.js',
        '../admin-side/reset-user-password/reset-user-password.spec.js',
        '../admin-side/admin-logout/admin-reset-password-logout.spec.js',
        '../forgotpassword/forgotpassword.spec.js'
    ],
    getPageTimeout: 100000000,
    allScriptsTimeout: 100000000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 100000000,
        showColors: true, // Use colors in the command line report.
    },
    directConnect : true,
    capabilities :{
        browserName: 'chrome',
        'chromeOptions': {
            prefs: {
             download: {
               'prompt_for_download': false,
               'default_directory': downloadsPath
             }
           }
         }
    },
    plugins: [{
        package: 'protractor-console-plugin',
        failOnWarning: false,
        failOnError: true,
        logWarnings: true
    }],
    onPrepare: function() {
        fs.rm('./output', { recursive: true }, () => console.log(''));
        browser.driver.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(1000);

        var disableLoop = true;

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: reports + '/xml',
            filePrefix: 'xmlOutput'
        }));

        
        if (!fs.existsSync(reports)) {
            fs.mkdirSync(reports, { recursive: true },() => console.log(''));
        }

        jasmine.getEnv().addReporter(new SpecReporter());

        jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: './output'
        }).getJasmine2Reporter());
    },
    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            var HTMLReport = require('protractor-html-reporter-2');
            testConfig = {
                reportTitle: 'Protractor Test Execution Report',
                outputPath: reports,
                outputFilename: 'index',
                screenshotPath: './',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            new HTMLReport().from(reports + '/xml/xmlOutput.xml', testConfig);
        });
    }
}