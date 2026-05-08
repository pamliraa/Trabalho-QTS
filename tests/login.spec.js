import { test, expect } from '@playwright/test';
const otplib = require('otplib');

test('Login com automação TOTP', async ({ page }) => {
    const secret = 'Z22HXCS3MC4MGWZDVHIIFU3C4R7YND2O';

    // Gera o OTP corretamente
    const otp = otplib.generateSync({ secret, algorithm: 'sha1', digits: 6, period: 30 });

    await page.goto('https://app.avaliei.com.br/login');

    await page.getByRole('textbox', { name: 'Email' }).fill('e2e-super-teacher-00@example.com');
    await page.getByRole('textbox', { name: 'Senha' }).fill('password');
    await page.getByRole('button', { name: 'Entrar' }).click();

    // Aguarda o campo OTP aparecer na tela
    await page.getByRole('textbox', { name: 'Código de verificação de 6 dí' }).waitFor({ state: 'visible' });

    await page.getByRole('textbox', { name: 'Código de verificação de 6 dí' }).fill(String(otp));
    await page.getByRole('button', { name: 'Verificar código de autentica' }).click();

    await expect(page).toHaveURL(/dashboard/);
});