import {test,expect} from '@playwright/test'
import {SignUpPage} from '../POM/SignUpPOM'
import { LoginPage } from '../POM/LogInPOM';
require('dotenv').config()

test('Test Case #1: Register User Test Case', async({page}) => {
    await test.step('Navigate to URL', async() => {
        await page.goto('https://www.automationexercise.com/');
        await expect(page.getByRole('heading', {name:'AutomationExercise'})).toBeVisible();
    });

    await test.step('Signup Valid New User', async() => {
        await page.getByText(' Signup / Login').click();
        await expect(page.getByRole('heading', {name:'New User Signup!'})).toBeVisible();

        //GRAB EXISTING USER CREDENTIALS FROM ENV
        //SINCE ENV IS IGNORED WE ADD ENV SECTION TO GITHUB ACTIONS TO ACCESS CREDENTIALS
        let name = process.env.SIGNUP_USERNAME
        let email = process.env.SIGNUP_EMAIL
        const password = process.env.SIGNUP_PASSWORD

        //IF EITHER EMAIL OR PASSWORD OR USERNAME IS MISSING/NULL FAIL THE TEST AND THROW AN ERROR
        if(!email || !name || !password){
            throw new Error('Missing login credentials');
        }

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
        await page.locator("//a[@data-qa='continue-button' and @class='btn btn-primary']").click();
        await expect(page).toHaveURL('https://www.automationexercise.com/');
        
    });
});

test('Test Case #2: Login User with correct email and password', async({page})=>{
    //Created an account for this, stored in dotenv/github secrets
    await test.step("Navigate to url", async()=>{
        await page.goto('http://automationexercise.com');
        await page.locator("//img[@alt='Website for automation practice']").isVisible();
        await page.locator("//a[@href='/login']").click();
    });

    await  test.step("Login with valid credentials", async()=>{
        const loginPage = new LoginPage(page);
        //GRAB EXISTING USER CREDENTIALS FROM ENV
        //SINCE ENV IS IGNORED WE ADD ENV SECTION TO GITHUB ACTIONS TO ACCESS CREDENTIALS
        const existingEmail = process.env.EXISTING_EMAIL;
        const existingPassword = process.env.EXISTING_PASSWORD;
        const existingUsername = process.env.EXISTING_USERNAME;

        //IF EITHER EMAIL OR PASSWORD IS MISSING/NULL FAIL THE TEST AND THROW AN ERROR
        if(!existingEmail || !existingPassword || !existingUsername){
            throw new Error("Missing existing credentials");
        }

        await loginPage.login(existingEmail, existingPassword);
        await expect(page.getByText("Logged in as "+existingUsername)).toBeVisible();
    });
});

test('Test Case #3: Login User with incorrect email and password', async({page})=>{
    await test.step('Navigate to Login', async()=>{
        await page.goto('https://www.automationexercise.com/');
        await page.locator("//a[@href='/login']").click();
    });

    await test.step('Input Incorrect credentials', async()=>{
        const loginPage = new LoginPage(page);
        await loginPage.login("fakeruseremail@email.com","badpassword43215");
        await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
    });
});

test('Test Case #4: Logout User', async({page})=>{
    await test.step('Navigate to URL and login as user', async()=>{
        await page.goto('https://www.automationexercise.com/');
        await page.locator("//a[@href='/login']").click();

        const loginPage = new LoginPage(page);
        const existingEmail = process.env.EXISTING_EMAIL;
        const existingPassword = process.env.EXISTING_PASSWORD;
        const existingUsername = process.env.EXISTING_USERNAME;

        if(!existingEmail || !existingPassword || !existingUsername){
            throw new Error("Missing credentials");
        }

        await loginPage.login(existingEmail,existingPassword);
        //verify username
        await expect(page.getByText("Logged in as " + existingUsername)).toBeVisible();
    });

    await test.step('Logout of user', async()=>{
        await page.locator("//a[@href='/logout']").click();
        await expect(page).toHaveURL('https://www.automationexercise.com/login');
    });
});

test('Test Case #5: Register User with Existing email', async({page})=>{

});

test('Test Case #6: Contact Us Form', async({page})=>{

});

test('Test Case #7: Verify Test Cases Page', async({page})=>{

});

test('Test Case #8: Verify All Products and Product detail page', async({page})=>{

});

test('Test Case #9: Search Product', async({page})=>{

});

test('Test Case #10: Verify Subscription in home page', async({page})=>{

});

test('Test Case #11: Verify Subscription in Cart page', async({page})=>{

});

test('Test Case #12: Add Products in Cart', async({page})=>{

});

test('Test Case #13: Verify Product quantity in Cart', async({page})=>{

});

test('Test Case #14: Place Order: Register while Checkout', async({page})=>{

});

test('Test Case #15: Place Order: Register before Checkout', async({page})=>{

});

test('Test Case #16: Login before Checkout', async({page})=>{

});

test('Test Case #17: Remove Products from Cart', async({page})=>{

});

test('Test Case #18: View Category Products', async({page})=>{

});

test('Test Case #19: View and Cart Brand Products', async({page})=>{

});

test('Test Case #20: Search Products and Verify Cart After Login', async({page})=>{

});

test('Test Case #21: Add Review on Product', async({page})=>{

});

test('Test Case #22: Add to cart from Recommended items', async({page})=>{

});

test('Test Case #23: Verify Address Details in Checkout Page', async({page})=>{

});

test('Test Case #24: Download Invoice after Purchase Order', async({page})=>{

});

test('Test Case #25: Verify Scroll Up using Arrow button and Scroll Down Functionality', async({page})=>{

});

test('Test Case #26: Verify Scroll Up without Arrow button and Scroll down functionality', async({page})=>{

});