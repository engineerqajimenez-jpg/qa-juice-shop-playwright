import {test, expect} from '@playwright/test'
import {RegisterPage} from '../../pages/RegisterPage'

test.describe('Register', () => {
    
    test('TC07 - Registro exitoso con datos validos', async ({ page } ) => {
        const email = `jose+${Date.now()}@email.com`;
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.register( email, '180701Jose.','180701Jose.','Name of your favorite pet?', 'Peggy')
        await expect(
  page.locator('div[matsnackbarlabel]').filter({ hasText: 'Registration completed successfully.' })
).toContainText('Registration completed successfully.');
    })

    test('TC08 - Registro fallido con email invalido', async ({ page } ) => {
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.fillFields( 'joseemail', '180701Jose.','180701Jose.')
        await expect(page.locator('#registerButton')).toBeDisabled();
    }) 

    test('TC09 - Registro fallido con password distinta a repeat password', async ({ page } ) => {
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.fillFields( 'jose@email.com', '180701Jose.','180701')
        await expect(page.locator('mat-error:has-text("Passwords do not match")')).toBeVisible();
        await expect(page.locator('#registerButton')).toBeDisabled();
    })

    test.fail('TC10 - Registro fallido con password invalido de solo numeros', async ({ page } ) => {
        const email = `jose+${Date.now()}@email.com`;
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.register( email, '12345678', '12345678', 'Name of your favorite pet?', 'Peggy' )
        await expect(page.locator('mat-error')).toBeVisible();
    })

    test.fail('TC11 - Registro fallido con password invalido de solo letras', async ({ page } ) => {
        const email = `jose+${Date.now()}@email.com`;
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.register( email, 'abcdefgh', 'abcdefgh', 'Name of your favorite pet?', 'Peggy' )
        await expect(page.locator('mat-error')).toBeVisible();
    })
    
    test.fail('TC12 - Registro fallido con password invalido de solo caracteres especiales', async ({ page } ) => {
        const email = `jose+${Date.now()}@email.com`;
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.register( email, '!!!!!!!!', '!!!!!!!!', 'Name of your favorite pet?', 'Peggy' )
        await expect(page.locator('mat-error')).toBeVisible();
    })

    test('TC13 - Registro fallido con password invalido de menos de 5 caracteres', async ({ page } ) => {
        const email = `jose+${Date.now()}@email.com`;
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.fillFields( email, '1234', '1234')
        await expect(page.locator('#registerButton')).toBeDisabled();
    })

    test('TC14 - Registro fallido con password invalido de mas de 50 caracteres', async ({ page } ) => {
        const email = `jose+${Date.now()}@email.com`;
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.fillFields( email, '123456789012345678901234567890123456789012345678901', '123456789012345678901234567890123456789012345678901')
        await expect(page.locator('#registerButton')).toBeDisabled();

    })

    test.fail('TC15 - Registro fallido con password invalido de solo espacios', async ({ page } ) => {
        const email = `jose+${Date.now()}@email.com`;
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.register( email, '     ', '     ', 'Name of your favorite pet?', 'Peggy' )
        await expect(page.locator('mat-error')).toBeVisible();
    })

    test('TC16 - Registro fallido con email ya registrado', async ({ page } ) => {
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.register( 'jose@email.com', 'Password123!', 'Password123!', 'Name of your favorite pet?', 'Peggy' )
        await expect(page.locator('div.error')).toContainText('Email must be unique');
    })

    test('TC17 - Registro fallido con campos vacios', async ({ page } ) => {
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.fillFields( '', '', '')
        await expect(page.locator('#registerButton')).toBeDisabled();
    })

    test('TC18 - Registro fallido con pregunta de seguridad vacia', async ({ page } ) => {
        const email = `jose+${Date.now()}@email.com`;
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.fillFieldsWithoutSecurityQuestion( email, 'Password123!', 'Password123!' )
        await expect(page.locator('#registerButton')).toBeDisabled();
    })

    test('TC19 - Registro fallido con respuesta de seguridad vacia', async ({ page } ) => {
        const email = `jose+${Date.now()}@email.com`;
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.fillFieldsWithoutSecurityAnswer( email, 'Password123!', 'Password123!', 'Name of your favorite pet?' )
        await expect(page.locator('#registerButton')).toBeDisabled();
    })
})