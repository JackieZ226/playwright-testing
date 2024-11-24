import {Page} from '@playwright/test'

export class SignUpPage{
    private page:Page

    constructor(page:Page){
        this.page = page;
    }

    async setTitle(title:string){
        await this.page.locator("//input[@type='radio' and @name='title' and @value = '" + title +"']").click();
    }

    async setName(name:string){
        await this.page.locator("//input[@id='name' and @data-qa='name']").fill(name);
    }

    async checkName(name:string){
        await this.page.locator("//input[@id=name and @value='"+name+"']").isVisible();
    }

    async checkEmail(email:string){
        await this.page.locator("//input[@id='email' and @value='"+email+"']").isVisible();
    }

    async setPassword(password:string){
        await this.page.locator("//input[@type='password' and @id='password']").fill(password);
    }

    async setDateOfBirth(day:string,month:string,year:string){
        await this.page.locator("//select[@data-qa='days' and @id='days']").selectOption(day);
        await this.page.locator("//select[@data-qa='months' and @id='months']").selectOption(month);
        await this.page.locator("//select[@data-qa='years' and @id='years']").selectOption(year);
    }

    async signUpForNewsletter(){
        await this.page.locator("//input[@type='checkbox' and @name='newsletter']").click();
    }

    async receiveSpecialOffers(){
        await this.page.locator("//input[@type='checkbox' and @name='optin']").click();
    }

    async setFirstName(firstName:string){
        await this.page.locator("//input[@type='text' and @data-qa='first_name']").fill(firstName);
    }

    async setLastName(lastName:string){
        await this.page.locator("//input[@type='text' and @data-qa='last_name']").fill(lastName)
    }

    async setCompany(company:string){
        await this.page.locator("//input[@type='text' and @data-qa='company']").fill(company);
    }

    async setAddress(address:string){
        await this.page.locator("//input[@type='text' and @data-qa='address']").fill(address);
    }

    async setAddress2(address2:string){
        await this.page.locator("//input[@type='text' and @data-qa='address2']").fill(address2);
    }

    async setCountry(country:string){
        await this.page.locator("//select[@data-qa='country' and @id='country']").selectOption(country);
    }

    async setState(state:string){
        await this.page.locator("//input[@type='text' and @data-qa='state']").fill(state);
    }

    async setCity(city:string){
        await this.page.locator("//input[@type='text' and @data-qa='city']").fill(city);
    }

    async setZipCode(zipCode:string){
        await this.page.locator("//input[@type='text' and @data-qa='zipcode']").fill(zipCode);
    }

    async setMobileNumber(mobileNumber:string){
        await this.page.locator("//input[@type='text' and @data-qa='mobile_number']").fill(mobileNumber);
    }

    async clickCreateAccount(){
        await this.page.getByRole('button',{name:'Create Account'}).click();
    }

    async enterEmailAddressForSubscription(email:string){
        await this.page.locator("//input[@id='susbscribe_email' and @placeholder='Your email address']").fill(email);
    }
}