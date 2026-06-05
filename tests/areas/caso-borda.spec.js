import { test, expect } from '@playwright/test';

test.describe('Caso de Borda - Áreas', () => {

    test('Deve validar caracteres especiais e nomes duplicados', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE ÁREAS
         await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();
        await page.waitForTimeout(500);

        await page.getByRole('link', {
            name: 'Áreas'
        }).click();

        // CASO DE BORDA 1 - CRIAR ÁREA COM CARACTERES ESPECIAIS
        await page.getByRole('button', { name: 'Adicionar área' }).click();
        await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('!@#$%^&*()');
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(
            page.getByText(/conteúdo inválido detectado/i)
        ).toBeVisible();

        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);

        // CASO DE BORDA 2 - CRIAR ÁREA E TENTAR DUPLICAR
        // Cria a primeira
        await page.getByRole('button', { name: 'Adicionar área' }).click();
        await page.getByRole('textbox', { name: 'Nome da Área:' }).fill('Área Borda Duplicada');
        await page.getByRole('button', { name: 'Salvar' }).click();
        await page.waitForTimeout(500);

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