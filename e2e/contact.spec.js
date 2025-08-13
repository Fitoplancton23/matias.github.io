const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUrl = 'file://' + path.resolve(__dirname, '../index.html');

test('envía formulario de contacto', async ({ page }) => {
  await page.goto(fileUrl);
  await page.fill('input[name="name"]', 'Test');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'Hola');
  await page.click('button[type="submit"]');
  await expect(page.locator('#contact-status')).not.toHaveText('');
});
