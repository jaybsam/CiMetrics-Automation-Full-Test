const HtmlReporter = require('protractor-beautiful-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    framework: 'jasmine',
    specs: ['authentication.spec.js'],
    directConnect : true,
    capabilities :{
        browserName: 'chrome'
    },
    onPrepare: function() {
        browser.driver.manage().window().maximize();
        
        jasmine.getEnv().addReporter(new SpecReporter());

        jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: './output'
        }).getJasmine2Reporter());
    }
}