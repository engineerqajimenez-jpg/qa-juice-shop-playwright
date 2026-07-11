import {test, expect} from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

test.describe('Login', () => {
    test('TC01 - Login exitoso con credenciales validas', async ({ page })  => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('admin@juice-sh.op', 'admin123');
        await expect(page).toHaveURL(/\/#\//);
    });

    test('TC02 - Login fallido con credenciales invalidas', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('Invalido', 'invalido');
        await expect(page.locator('div.error')).toContainText('Invalid email or password.');
    });

    test('TC03 - Login fallido con campos vacios', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.fillCredentials('', '');
        await expect(page.locator('#loginButton')).toBeDisabled();
    });

    test('TC04 - Login fallido con email vacio y password valida', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.fillCredentials('', 'admin123');
        await expect(page.locator('#loginButton')).toBeDisabled();
    });

    test('TC05 - Login fallido con email valido y password vacia', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.fillCredentials('admin@juice-sh.op', '');
        await expect(page.locator('#loginButton')).toBeDisabled();
    });

    test('TC06 - SQL Injection bypasea login', async ({ page }) => {
       const loginPage = new LoginPage(page);
       await loginPage.navigate();
       await loginPage.login("' OR true--", 'x');
       await expect(page).toHaveURL(/\/#\//);
    });

    test('TC20 - email valido con espacios adicionales', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(' admin@juice-sh.op ', 'admin123');
        await expect(page.locator('div.error')).toContainText('Invalid email or password.');
    });
})