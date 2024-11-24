import {test,expect} from '@playwright/test'
import {SignUpPage} from '../POM/SignUpPOM'
import * as dotenv from 'dotenv'

test('Register User Test Case', async({page}) => {
    await test.step('Navigate to URL', async() => {
        await page.goto('https://www.automationexercise.com/');
        await expect(page.getByRole('heading', {name:'AutomationExercise'})).toBeVisible();
    });

    await test.step('Signup Valid New User', async() => {
        await page.getByText(' Signup / Login').click();
        await expect(page.getByRole('heading', {name:'New User Signup!'})).toBeVisible();

        let name:string = "JackieZh";
        let email:string = "JackieZHTest@Email.com";
        dotenv.config();
        //review throwing errors and IIFE
        //sets password to the env variable in .env
        const password:string = process.env.PASSWORD ?? (() => {
            throw new Error('Environment variable PASSWORD is required');
        })();
        //Fill in Sign Up information in Login/Signup page
        await page.getByPlaceholder('Name').fill(name);
        await page.locator("//input[@data-qa='signup-email']").fill(email); //locator for email
        await page.getByRole('button',{name:'Signup'}).click();

        //Fill in Sign Up information in sign up page
        await expect(page).toHaveURL("https://www.automationexercise.com/signup");
        await expect(page.getByText('Enter Account Information')).toBeVisible();

        //Use POM to fill in information
        const signUpPage = new SignUpPage(page);
        await signUpPage.setTitle("Mr");
        await signUpPage.checkName(name);
        await signUpPage.checkEmail(email);
        await signUpPage.setPassword(password);
        await signUpPage.setDateOfBirth("26","February","2000");
        await signUpPage.signUpForNewsletter();
        await signUpPage.receiveSpecialOffers();
        await signUpPage.setFirstName("Jackie");
        await signUpPage.setLastName("Zhao");
        await signUpPage.setCompany("Example Company");
        await signUpPage.setAddress("1234 Example Address");
        await signUpPage.setAddress2("Apt 1234");
        await signUpPage.setCountry("United States");
        await signUpPage.setState("Florida");
        await signUpPage.setCity("Orlando");
        await signUpPage.setZipCode("12345");
        await signUpPage.setMobileNumber("123-456-7890");
        await signUpPage.enterEmailAddressForSubscription(email);
        await signUpPage.clickCreateAccount();

        //Continue after account creation
        await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
        await expect(page).toHaveURL('https://www.automationexercise.com/account_created');
        await page.locator("//a[@data-qa='continue-button' and @class='btn btn-primary']").click();

        //verify we are logged in as correct user
        await expect(page.getByText("Logged in as "+name+"")).toBeVisible();

        //below is a link and links don't have spaces so we replace with _
        await page.locator("//a[@href='/delete_account']").click();
        
        //Delete the account and continue to main dashboard/URL
        await expect(page.getByText("ACCOUNT DELETED!")).toBeVisible();
        await page.locator("//a[@data-qa='continue-button' and @class='btn btn-primary']");
        await expect(page).toHaveURL('https://www.automationexercise.com/');
    });
})