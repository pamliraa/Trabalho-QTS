import { test, expect } from '@playwright/test';

test.describe('Caso de Borda - Áreas', () => {

    test('Deve validar caracteres especiais', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE ÁREAS
         await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();
        await page.waitForTimeout(500);

        await page.getByRole('link', {
            name: 'Áreas'
        }).click();

        await page.getByRole('button', { name: 'Adicionar área' }).click();
        await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('!@#$%^&*()');
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(
            page.getByText(/conteúdo inválido detectado/i)
        ).toBeVisible();

        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);

    });

    test('Deve validar nomes duplicados', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE ÁREAS
         await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();
        await page.waitForTimeout(500);

        await page.getByRole('link', {
            name: 'Áreas'
        }).click();

        // Tenta criar com o mesmo nome
        await page.getByRole('button', { name: 'Adicionar área' }).click();
        await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('Área Borda Duplicada');
        await page.waitForTimeout(500);
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(
            page.getByText(/já existe uma área com o nome/i)
        ).toBeVisible();

    });


});

test.describe('Caso Feliz - Áreas', () => {

    test('Deve criar uma área', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE ÁREAS
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Áreas'
        }).click();

        // CREATE
        await page.getByRole('button', {
            name: 'Adicionar área'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome da Área:'
        }).fill("Área criada");

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

    });

    test('Deve excluir uma área', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE ÁREAS
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Áreas'
        }).click();

        // READ
        await page.getByRole('textbox', {
            name: 'Pesquisar área...'
        }).fill('Área criada');

        // DELETE
        await page.getByRole('button', {
            name: 'Excluir'
        }).first().click();

        await page.getByRole('button', {
            name: 'Excluir'
        }).click();

    });

});

test.describe('Caso Triste - Áreas', () => {

    test('Deve validar campos obrigatórios', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE ÁREAS
         await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Áreas'
        }).click();
 
        // TENTAR CRIAR SEM PREENCHER NADA
        await page.getByRole('button', { name: 'Adicionar área' }).click();
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(
            page.getByText(/este campo é obrigatório/i).first()
        ).toBeVisible();
    });

    test('Deve validar ações inválidas', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE ÁREAS
         await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Áreas'
        }).click();

        // ABRIR EXCLUSÃO E CANCELAR
        await page.getByRole('button', { name: 'Excluir', exact: true }).first().click();
        await page.getByRole('button', { name: /cancelar|não/i }).click();

        // Valida que o item ainda existe na lista
        await expect(
            page.locator('tbody')
        ).toBeVisible();
    });

});

