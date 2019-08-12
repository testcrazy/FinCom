var LandingPage = require('./PO.js');
var data = require('./Data.json');
var error = require('./error.js');
var using = require('jasmine-data-provider');
var landing = require('./Landingpage.js');

var landingpage = new LandingPage();


function errormessage(){
    description('Just a test suit', function(){
        using(error.DataDriven, function(error, description){
            it('Enter different values to see error messages', + description, function(){
                    landingpage.first_name(error.first_name);
                    landingpage.last_name(error.last_name);
                    landingpage.email(error.email);
                    landingpage.phone(error.phone);
                    //landingpage.submit_btn_signup.click();
                    browser.sleep(2000);

            });
        }); 
    });
};





