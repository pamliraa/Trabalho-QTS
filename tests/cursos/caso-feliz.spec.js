import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test.describe('Caso Feliz - CRUD de Cursos', () => {

    test('Deve criar, visualizar, editar e excluir um curso', async ({ page }) => {

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

        // CREATE
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill('Desenvolvimento de Sistemas');

        await page.getByRole('button', {
            name: 'Nível de Escolaridade'
        }).click();

        await page.getByText('Técnico').click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // READ
        await page.getByRole('textbox', {
            name: 'Pesquisar curso...'
        }).fill('Desenvolvimento de Sistemas');

        await expect(
            page.getByText('Desenvolvimento de Sistemas')
        ).toBeVisible();

        // UPDATE
        await page.getByRole('button', {
            name: 'Editar'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill('DS');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // READ
        await page.getByRole('button', {
            name: 'Limpar pesquisa'
        }).click();

        await page.getByRole('textbox', {
            name: 'Pesquisar curso...'
        }).fill('DS');

        await expect(
            page.getByText('DS')
        ).toBeVisible();

        // DELETE
        await page.getByRole('button', {
            name: 'Excluir'
        }).click();

        await page.getByRole('button', {
            name: 'Excluir'
        }).click();

    });

});