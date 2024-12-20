import {Page,expect} from '@playwright/test'

export class LoginPage{
    private page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async login(email:string,password:string,){
        if(await this.page.url() === "https://www.automationexercise.com/login"){
        }
        else{
            await this.page.goto("https://www.automationexercise.com/login");
        }

        await this.page.locator("//input[@type='email' and @data-qa='login-email']").fill(email);
        await this.page.locator("//input[@type='password' and @data-qa='login-password']").fill(password);
        await this.page.getByRole('button',{name:'Login'}).click();
    }
}