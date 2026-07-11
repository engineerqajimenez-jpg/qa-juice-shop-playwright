import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/#/login');

    await this.page.locator('button[aria-label="Close Welcome Banner"]')
        .click({ timeout: 5000 })
        .catch(() => {});

    await this.page.locator('button[aria-label="dismiss cookie message"]')
        .click({ timeout: 5000 })
        .catch(() => {});
  } 

  async login(email: string, password: string) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('#loginButton');
  }

  async fillCredentials(email: string, password: string) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
  }
} 