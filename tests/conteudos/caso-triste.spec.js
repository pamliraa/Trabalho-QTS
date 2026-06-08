import { test, expect } from '@playwright/test';

test.describe('Caso Triste - Conteúdos', () => {

    test('Deve validar campos obrigatórios e campos duplicados', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Conteúdos'
        }).click();

        // CASO TRISTE 1 - SALVAR SEM PREENCHER NADA
        await page.getByRole('button', {
            name: 'Adicionar Conteúdo'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        await expect(
            page.locator('#content-nome-error')
        ).toBeVisible();

        await expect(
            page.locator('#content-disciplina-error')
        ).toBeVisible();

        // CASO TRISTE 2 - CONTEÚDO DUPLICADO
        await page.getByRole('textbox', {
            name: 'Nome do conteúdo: *'
        }).fill('Célula: estrutura e função');

        await page.getByRole('button', {
            name: 'Disciplina'
        }).click();

        await page.getByRole('option', {
            name: 'Biologia'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        await expect(
            page.getByText(/já existe um conteúdo/i)
        ).toBeVisible();

    });

});