import {test,expect} from '@playwright/test'

test('Register User Test Case', async({page}) => {
    await test.step('Navigate to URL', async() => {
        await page.goto('https://www.automationexercise.com/');
        await expect(page.getByRole('heading', {name:'AutomationExercise'})).toBeVisible();
    });

    await test.step('Signup', async() => {
        await page.getByText(' Signup / Login').click();
        await expect(page.getByRole('heading', {name:'New User Signup!'})).toBeVisible();
    })
})