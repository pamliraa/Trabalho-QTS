import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test.describe('Caso de Borda - Limite de caracteres da descrição', () => {

    test('Deve validar descrição com 124, 125 e 126 caracteres', async ({ page }) => {
        
        const descricao124 = 'a'.repeat(124);
        const descricao125 = 'a'.repeat(125);
        const descricao126 = 'a'.repeat(126);

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

        await page.getByRole('link', {
            name: 'Avaliações'
        }).click();

        // BORDA 124 CARACTERES
        await page.getByRole('button', {
            name: 'Criar Avaliação'
        }).click();

        await page.getByRole('textbox', {
            name: 'Descrição da avaliação: *'
        }).fill(descricao124);

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

        await page.getByRole('spinbutton', {
            name: /Quantidade de questões/i
        }).fill('10');

        await page.locator('div').filter({ 
            hasText: /^Selecionar turmas$/ 
        }).nth(1).click();

        await page.getByRole('option')
            .first()
            .click();

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        await expect(
            page.getByText(descricao124)
        ).not.toBeVisible();

        // BORDA 125 CARACTERES
        await page.getByRole('button', {
            name: 'Criar Avaliação'
        }).click();

        await page.getByRole('textbox', {
            name: 'Descrição da avaliação: *'
        }).fill(descricao125);

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

        await page.getByRole('spinbutton', {
            name: /Quantidade de questões/i
        }).fill('10');

        await page.locator('div').filter({ 
            hasText: /^Selecionar turmas$/ 
        }).nth(1).click();

        await page.getByRole('option')
            .first()
            .click();

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        await expect(
            page.getByText(descricao125)
        ).not.toBeVisible();

        // BORDA 126 CARACTERES
        await page.getByRole('button', {
            name: 'Criar Avaliação'
        }).click();

        await page.getByRole('textbox', {
            name: 'Descrição da avaliação: *'
        }).fill(descricao126);

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

        await page.getByRole('spinbutton', {
            name: /Quantidade de questões/i
        }).fill('10');

        await page.locator('div').filter({ 
            hasText: /^Selecionar turmas$/ 
        }).nth(1).click();

        await page.getByRole('option')
            .first()
            .click();

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        await expect(
            page.getByText('O campo descrição não pode ser superior a 125 caracteres.')
        ).toBeVisible();

    });

});