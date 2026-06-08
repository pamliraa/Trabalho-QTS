const { chromium } = require('@playwright/test');
const { authenticator } = require('otplib');

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const secret = 'AP5BHAXAAU7GAKDI';
  const otp = authenticator.generate(secret);

  await page.goto('https://app.avaliei.com.br/login');

  await page.getByRole('textbox', { name: 'Email' })
    .fill('e2e-super-teacher-35@example.com');

  await page.getByRole('textbox', { name: 'Senha' })
    .fill('password');

  await page.getByRole('button', { name: 'Entrar' })
    .click();

  await page.getByRole('textbox', {
    name: /Código de verificação/i
  }).fill(otp);

  await page.getByRole('button', {
    name: /Verificar código/i
  }).click();

  await page.waitForURL(/dashboard/, {
    timeout: 60000
  });

  await page.context().storageState({
    path: 'playwright/.auth/user.json'
  });

  await browser.close();
}

module.exports = globalSetup;