var HtmlReporter = require('protractor-beautiful-reporter');
var path = require('path');
var downloadsPath = path.resolve(__dirname, '../../downloads');

exports.config = {
    framework: 'jasmine',
    specs: ['../login/authentication.spec.js', 'download-completed-application.spec.js', '_con_download-completed_application.spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
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
    onPrepare: function() {
        browser.driver.manage().window().maximize();

        jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: './output'
        }).getJasmine2Reporter());
    }
}