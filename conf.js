// A basic configuration file
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',
  
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
      browserName: 'chrome'
    },
  
    // Spec patterns are relative to the configuration file location passed
    // to protractor (in this example conf.js).
    // They may include glob patterns.
    specs: ['Landingpage.js'],

/*     suites://How to run suits
      {
        Smoke:[Spec1, Spec2]
      }, */

    onPrepare: function(){
      //content that will be executed for every test using this conf file
      browser.waitForAngularEnabled(false);
      browser.ignoreSynchronization = true;
      browser.manage().window().maximize();
      jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
          savePath: 'target/screenshots'
          })
      );
    },
  
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
      defaultTimeoutIntervall: 300000,
      showColors: true, // Use colors in the command line report.
    }
  };