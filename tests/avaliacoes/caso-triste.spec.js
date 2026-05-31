import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test.describe('Caso Triste - Validações da Avaliação', () => {

    test('Deve validar campos obrigatórios e bloco incompleto', async ({ page }) => {

        // LOGIN
        const secret = 'ZFKZGKE3DTP4COGC';
        const otp = authenticator.generate(secret);

        await page.goto('https://app.avaliei.com.br/login');

        await page.getByRole('textbox', {
            name: 'Email'
        }).fill('e2e-super-teacher-39@example.com');

        await page.getByRole('textbox', {
            name: 'Senha'
        }).fill('password');

        await page.getByRole('button', {
            name: 'Entrar'
        }).click();

        await page.getByRole('textbox', {
            name: /Código de verificação/i
        }).fill(otp);

        await page.getByRole('button', {
            name: /Verificar código/i
        }).click();

        await expect(page).toHaveURL(/dashboard/);

        // ACESSAR AVALIAÇÕES
        await page.getByRole('link', {
            name: 'Avaliações'
        }).click();

        // CASO TRISTE 1 - SALVAR SEM NADA
        await page.getByRole('button', {
            name: 'Criar Avaliação'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        await expect(
            page.getByText('É necessário ter pelo menos um bloco completo')
        ).toBeVisible();

        // CASO TRISTE 2 - BLOCO PREENCHIDO, MAS AVALIAÇÃO NÃO
        await page.getByRole('button', {
            name: 'Professor'
        }).click();

        await page.getByRole('option')
            .first()
            .click();

        await page.getByRole('combobox', {
            name: /Selecionar disciplina/i
        }).click();

        await page.getByRole('option')
            .first()
            .click();

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        await expect(
            page.getByText('Por favor, corrija os erros no formulário.')
        ).toBeVisible();

    });

});