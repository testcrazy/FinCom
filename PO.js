//Page object pattern for this test
var data = require('./Data.json');
var landingpage = function(){
    //----------------------------1. Part of signup----------------------------------------------------
    this.headline = element(by.css("h1[class='funnel__products__heading']"));
    this.options = element.all(by.css("h2[class='funnel__products__title']"));
    this.option = element(by.css('a[href="/wizard/products/credit"]'));

    //----------------------------2. Part of signup----------------------------------------------------
    this.headline_credit = element(by.css("h2[class='funnel__step__title']"));
    this.input_money = element(by.id("amount"));
    this.select_purpose = element(by.id("select-purpose"));
    this.purpose_options = element.all(by.xpath("/html/body/div[4]/div[2]/ul/li"));
    this.specific_option = element(by.xpath("/html/body/div[4]/div[2]/ul/li[5]"));
    this.select_term = element(by.id("select-term"));
    this.select_term_options = element.all(by.xpath("/html/body/div[4]/div[2]/ul/li"));
    this.select_term_option = element(by.xpath("/html/body/div[4]/div[2]/ul/li[5]"));
    this.submit_btn_credit = element(by.buttonText("Weiter"));

    //----------------------------3. Part of signup----------------------------------------------------
    this.headline_company = element(by.css("h2[class ='funnel__step__title']"));
    this.input_company = element(by.id("companyName"));
    this.submit_btn_company = element(by.buttonText("Unternehmen suchen"));
    this.displayed_numbers = element(by.css("h3[class='section-title']"));
    this.displayed_company = element.all(by.cssContainingText("[class='section-title']","FinCompare GmbH"));
    this.select_company = element(by.xpath("/html/body/div[1]/div/div[1]/div/div[2]/div"));

    //----------------------------4. Part of signup----------------------------------------------------
    this.headline_personal_data = element(by.css("h2[class='account__header__title']"));
    this.check_login = element(by.cssContainingText("a[class='account__header--link']","Zum Login"));
    this.gender = element(by.css('input[value="m"]'));
    this.first_name = element(by.id("firstName"));
    this.last_name = element(by.id("lastName"));
    this.email = element(by.id("email"));
    this.phone = element(by.id("phone"));
    this.newsletter = element(by.name("newsletter"));
    this.submit_btn_signup = element(by.buttonText("Kostenlos registrieren"));
    this.business_relations = element(by.id("select-businessRelation"));
    this.business_relations_container = element.all(by.xpath("/html/body/div[4]/div[2]/ul/li"));
    this.busines_relation = element(by.xpath("/html/body/div[4]/div[2]/ul/li[1]"));
    this.num_errors = element.all(by.xpath('//*[@id="name-error-text"]'));

    
    this.getURL = function(){
        browser.get("https://app.fincompare.de/wizard");
        browser.sleep(2000);
    };

    this.searchOption = function(option){
        this.options.each(function(item){
            item.getText().then(function(text){
                if(text===option){
                    console.log(text + " was found"); 
                };
            });
        });
        this.option.click();
    };

    this.pick_purpose = function(purpose){
        this.purpose_options.each(function(item){
            item.getText().then(function(text){
                if(text===purpose){
                    console.log(text + " was found")
                };
            });
        });
        this.specific_option.click();
    };

    this.pick_term = function(term){
        this.select_term_options.each(function(item){
            item.getText().then(function(text){
                if(text===term){
                    console.log(text + " was found");
                };
            });
        });
        this.select_term_option.click();
    };

    this.check_company_results = function(numbers){
        this.displayed_numbers.getText().then(function(text){
            var res = text.split("(");
            expect(res[1].trim().charAt(0)).toBe(numbers);
        });
    };

    this.click_company = function(company){
        this.displayed_company.getText().then(function(text){
            if(text[0]===data.company){
                console.log(text[0] + " was found");
            };
        });
        this.select_company.click();
    };

    this.login_text = function(login_text){
        this.check_login.getText().then(function(text){
            if(text===login_text){
                console.log(text + " was found");
            };
        });
    };

    this.gender_check = function(){
        if(expect(this.gender.getAttribute('checked')).toBeTruthy()){
            console.log("Gender m is selected");
        }else{
            console.log("Gender f is selected");
        };
    };
    this.personaldata = function(value1, value2, value3, value4){
        this.first_name.sendKeys(value1);
        this.last_name.sendKeys(value2);
        this.email.sendKeys(value3);
        this.phone.sendKeys(value4);
    };

    this.company_relation = function(){
        this.business_relations.click();
        this.business_relations_container.each(function(item){
            item.getText().then(function(text){
                if(text===data.business_relation){
                    console.log(text + " was found");
                };
            });   
        });
        this.busines_relation.click();  
    };

    this.number_error_messages = function(){
        this.num_errors.count().then(function(text){
            console.log(text + " errors were found");
        });
    };

    this.check_error_messages = function(){
        this.submit_btn_signup.click();
        browser.sleep(2000);
        this.number_error_messages();
    };

};

module.exports = landingpage;