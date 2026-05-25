import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test('Login com automação TOTP', async ({ page }) => {

    const secret = 'ZFKZGKE3DTP4COGC';

    const otp = authenticator.generate(secret);

    await page.goto('https://app.avaliei.com.br/login');

    await page.getByRole('textbox', { name: 'Email' }).fill('e2e-super-teacher-00@example.com');
    await page.getByRole('textbox', { name: 'Senha' }).fill('password');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await page.getByRole('textbox', {
        name: /Código de verificação/i
    }).fill(otp);

    await page.getByRole('button', {
        name: /Verificar código/i
    }).click();

    await expect(page).toHaveURL(/dashboard/);
});