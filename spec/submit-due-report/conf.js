var HtmlReporter = require('protractor-beautiful-reporter');
exports.config = {
    framework: 'jasmine',
    specs: ['../login/authentication.spec.js','submit-due-report.spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    directConnect : true,
    capabilities :{
        browserName: 'chrome'
    },
    onPrepare: function() {
        browser.driver.manage().window().maximize();
        
        jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: './output'
        }).getJasmine2Reporter());
    }
}