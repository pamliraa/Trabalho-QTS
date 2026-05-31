import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test.describe('Caso Triste - Validação de campos obrigatórios do Curso', () => {

    test('Deve validar cadastro sem dados, sem escolaridade e sem nome', async ({ page }) => {

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

        // CASO TRISTE 1 - SALVAR SEM PREENCHER NADA
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(page.getByText('Este campo é obrigatório')).toBeVisible();

        // CASO TRISTE 2 - SEM ESCOLARIDADE
        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill('Redes');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(page.getByText('Selecione o nível de escolaridade')).toBeVisible();

        // CASO TRISTE 3 - SEM NOME
        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).clear();

        await page.getByRole('button', {
            name: 'Nível de Escolaridade'
        }).click();

        await page.getByText('Pós-Graduação').click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(page.getByText('Este campo é obrigatório')).toBeVisible();

    });

});