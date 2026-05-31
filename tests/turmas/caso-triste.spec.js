import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test.describe('Caso Triste - Campos obrigatórios da Turma', () => {

    test('Deve validar campos obrigatórios', async ({ page }) => {

        // LOGIN
        const secret = 'ZFKZGKE3DTP4COGC';
        const otp = authenticator.generate(secret);

        await page.goto('https://app.avaliei.com.br/login');

        await page.getByRole('textbox', { name: 'Email' })
            .fill('e2e-super-teacher-39@example.com');

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

        await expect(page).toHaveURL(/dashboard/);

        // ACESSAR TELA DE TURMAS
        await page.getByRole('button', { name: 'Turmas' }).click();
        await page.getByRole('link', { name: 'Turmas' }).click();

        // CASO TRISTE 1 - SALVAR SEM PREENCHER NADA
        await page.getByRole('button', {
            name: 'Adicionar nova turma'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(page.getByText('Este campo é obrigatório')).toBeVisible();

        // CASO TRISTE 2 - APENAS CURSO E ANO
        await page.getByRole('button', {
            name: 'Curso'
        }).click();

        await page.getByLabel('Suggestions')
            .getByText('Fisioterapia')
            .click();

        await page.getByRole('textbox', {
            name: 'Ano: *'
        }).fill('2026');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(page.getByText('Este campo é obrigatório')).toBeVisible();
        
    });

});