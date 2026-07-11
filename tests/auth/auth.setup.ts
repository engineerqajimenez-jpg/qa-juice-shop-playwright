import {test as setup} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('admin@juice-sh.op', 'admin123');
    await page.waitForURL(/\/#\//);
    await page.waitForFunction(() => localStorage.getItem('token') !== null);
    await page.context().storageState({ path: authFile });
});