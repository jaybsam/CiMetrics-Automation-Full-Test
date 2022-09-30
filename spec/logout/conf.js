const HtmlReporter = require('protractor-beautiful-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    framework: 'jasmine',
    specs: ['../login/authentication.spec.js', 'logout.spec.js'],
    directConnect : true,
    capabilities :{
        browserName: 'chrome'
    },
    plugins: [{
        package: 'protractor-console-plugin',
        failOnWarning: false,
        failOnError: true,
        logWarnings: true
    }],
    onPrepare: function() {
        browser.driver.manage().window().maximize();

        jasmine.getEnv().addReporter(new SpecReporter());
        
        jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: './output'
        }).getJasmine2Reporter());
    }
}