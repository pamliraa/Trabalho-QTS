import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test.describe('Caso de Borda - Limite de caracteres no cadastro de cursos', () => {

    test('Deve validar cadastro com 124, 125 e 126 caracteres', async ({ page }) => {

        const nome124 = 'i'.repeat(124);
        const nome125 = 'i'.repeat(125);
        const nome126 = 'i'.repeat(126);

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

        // ACESSAR TELA DE CURSOS
        await page.getByRole('button', {
            name: 'Turmas'
        }).click();

        await page.getByRole('link', {
            name: 'Cursos'
        }).click();

        // CREATE - 124 CARACTERES
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill(nome124);

        await page.getByRole('button', {
            name: 'Nível de Escolaridade'
        }).click();

        await page.getByRole('option', {
            name: 'Técnico'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // READ
        await page.getByRole('textbox', {
            name: 'Pesquisar curso...'
        }).fill(nome124);

        await expect(page.getByText(nome124)).toBeVisible();

        // CREATE - 125 CARACTERES
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill(nome125);

        await page.getByRole('button', {
            name: 'Nível de Escolaridade'
        }).click();

        await page.getByRole('option', {
            name: 'Técnico'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        await expect(page.getByText(nome125)).toBeVisible();

        // CREATE - 126 CARACTERES
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill(nome126);

        await page.getByRole('button', {
            name: 'Nível de Escolaridade'
        }).click();

        await page.getByRole('option', {
            name: 'Técnico'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // VALIDAÇÃO DE ERRO
        await expect(page.getByText('O campo nome do curso não pode ser superior a 125 caracteres.')).toBeVisible();

    });

});