import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {

    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByPlaceholder('UserName').fill('liviasmith');
    await page.getByPlaceholder('Password').fill('p@ssw0rd');
    await page.getByRole('button', { name: 'Login' }).click()
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    // await page.waitForURL('https://demoqa.com/profile');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page).toHaveURL('https://demoqa.com/login');

    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});