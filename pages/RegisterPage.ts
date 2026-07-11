import {Page}  from '@playwright/test'

export class RegisterPage {
    constructor(private page: Page) {}

    async navigate() {
    await this.page.goto('/#/register');

    await this.page.locator('button[aria-label="Close Welcome Banner"]')
        .click({ timeout: 5000 })
        .catch(() => {});

    await this.page.locator('button[aria-label="dismiss cookie message"]')
        .click({ timeout: 5000 })
        .catch(() => {});
    }
    
    async register (email: string, password: string, repeatpassword: string,securityQuestion: string, answer: string) {
       await this.page.fill('#emailControl', email);
       await this.page.fill('#passwordControl', password);
       await this.page.fill('#repeatPasswordControl', repeatpassword);
       await this.page.locator('#mat-select-0').dispatchEvent('click');
       await this.page.locator('mat-option:has-text("' + securityQuestion + '")').click();
       await this.page.fill('#securityAnswerControl', answer);
       await this.page.click('#registerButton');
    }

    async fillFields(email: string, password: string, repeatpassword: string) {
      await this.page.fill('#emailControl', email);
      await this.page.fill('#passwordControl', password);
      await this.page.fill('#repeatPasswordControl', repeatpassword);
      await this.page.keyboard.press('Tab');
    }
    
    async fillFieldsWithoutSecurityQuestion(email: string, password: string, repeatpassword: string) {
    await this.page.fill('#emailControl', email);
    await this.page.fill('#passwordControl', password);
    await this.page.fill('#repeatPasswordControl', repeatpassword);
    await this.page.keyboard.press('Tab');
    }

    async fillFieldsWithoutSecurityAnswer(email: string, password: string, repeatpassword: string, securityQuestion: string) {
    await this.page.fill('#emailControl', email);
    await this.page.fill('#passwordControl', password);
    await this.page.fill('#repeatPasswordControl', repeatpassword);
    await this.page.locator('#mat-select-0').dispatchEvent('click');
    await this.page.locator('mat-option:has-text("' + securityQuestion + '")').click();
    await this.page.keyboard.press('Tab');
    }
}