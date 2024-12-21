import {Page} from '@playwright/test'

export class ContactUsPOM{
    private page:Page

    constructor(page:Page){
        this.page=page;
    }

    async contact(name:string, email:string, subject:string, message:string, filePath:string){
        await this.page.locator("//input[@name='name' and @data-qa='name']").fill(name);
        await this.page.locator("//input[@name='email' and @data-qa='email']").fill(email);
        await this.page.locator("//input[@name='subject' and @data-qa='subject']").fill(subject);
        await this.page.locator("//textarea[@name='message' and @data-qa='message']").fill(message);
        //note how to upload files
        await this.page.locator("//input[@type='file' and @name='upload_file']").setInputFiles(filePath);

        //note down how to handle dialog popups
        this.page.on('dialog', async(dialog)=>{
            console.log(`Dialog Message: ${dialog.message()}`);
            await dialog.accept();
        })

        await this.page.getByRole('button',{name:'Submit'}).click();
    }
}