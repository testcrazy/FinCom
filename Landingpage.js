//All actions for the landingpage
var LandingPage = require('./PO.js');
var data = require('./Data.json');
var using = require('jasmine-data-provider');
var error = require('./error.js');

describe('Tests only for the landing page', function(){

    var landingpage = new LandingPage();
    
    it('Open landingpage and check main headline', function(){

        //Open landingpage
        landingpage.getURL();

        //Check headline for correct text
        expect(landingpage.headline.getText()).toBe(data.headline_landingpage);
    });

    it('Check if specific option is displayed and click it', function(){

        //Search for specific option and click if present
        landingpage.searchOption(data.option);
        //browser.sleep(2000);
    });

    //-----End of page landingpage-----

    it('Check headline of page credit', function(){
        expect(landingpage.headline_credit.getText()).toBe(data.headline_credit);
        //browser.sleep(2000);
    });

    it('Check if input field for amount € is displayed and enter value', function(){
        expect(landingpage.input_money.isDisplayed()).toBe(true);
        landingpage.input_money.sendKeys(data.credit_amount_valid);
        //browser.sleep(2000);
    });

    it('Check if purpose dropdown is clickable and open it', function(){
        expect(landingpage.select_purpose.isDisplayed()).toBe(true);
        landingpage.select_purpose.click();
        //browser.sleep(2000);

    });

    it('Pick one option and click it', function(){
        landingpage.pick_purpose(data.purpose);
        //browser.sleep(2000);
    });

    it('Check if select term is clickable and open it', function(){
        expect(landingpage.select_term.isDisplayed()).toBe(true);
        landingpage.select_term.click();
        //browser.sleep(2000);

    });

    it('Pick one term and click it', function(){
        landingpage.pick_term(data.term);
        //browser.sleep(2000);

    });

    it('Click button for next page', function(){
        expect(landingpage.submit_btn_credit.isDisplayed()).toBe(true);
        landingpage.submit_btn_credit.click();
        browser.sleep(2000);

    });

    //-----End of page 2-----

    it('Check headline of page company', function(){
        expect(landingpage.headline_company.getText()).toBe(data.headline_company);
        //browser.sleep(2000);
    });

    it('Check if input field for company is displayed and enter company name', function(){
        expect(landingpage.input_company.isDisplayed()).toBe(true);
        landingpage.input_company.sendKeys(data.company);
        //browser.sleep(2000);
    });

    it('Click button to start search for company', function(){
        expect(landingpage.submit_btn_company.isDisplayed()).toBe(true);
        landingpage.submit_btn_company.click();
        //browser.sleep(2000);
    });

    it('Check number of results displayed', function(){
        landingpage.check_company_results(data.expected_company_results);
       //browser.sleep(2000);
    });

    it('Check if specific company card is displayed and click it', function(){
            landingpage.click_company(data.company);
            //browser.sleep(2000);
    });

    //-----End of page 3-----

    it('Check headline of page registration', function(){
        expect(landingpage.headline_personal_data.getText()).toBe(data.headline_personal_data);
        //browser.sleep(2000);
    });

    it('Check login link is present', function(){
        landingpage.login_text(data.login_link);
        //browser.sleep(2000);
    });

    it('Check if radio button male is selected by default', function(){
        landingpage.gender_check();
        //browser.sleep(2000);
    });

    it('Check if all error messages appear', function(){
        landingpage.check_error_messages();
    });

    it('Check if business relation is displayed', function(){
        expect(landingpage.business_relations.isDisplayed()).toBe(true);
    });

    it('Click business relations and pick a specific option', function(){
        landingpage.company_relation();
        browser.sleep(2000);
        landingpage.check_error_messages();
         
    });

    using(error.DataDriven, function(error){
        it('Enter different sets of personal data to check error messages', function(){
            landingpage.personaldata(error.first_name, error.last_name, error.email, error.phone);
            browser.sleep(2000);
            landingpage.check_error_messages();
        });
    });
    
});