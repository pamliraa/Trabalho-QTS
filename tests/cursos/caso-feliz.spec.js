import { test, expect } from '@playwright/test';

test.describe('Caso Feliz - CRUD de Áreas', () => {

    test('Deve criar, visualizar, editar e excluir uma área', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA
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
            name: /Nome da Área/i
        }).fill('Área aleatória');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // READ
        await page.getByRole('textbox', {
            name: /Pesquisar área/i
        }).fill('Área aleatória');

        await expect(
            page.getByText('Área aleatória').first()
        ).toBeVisible();

        // UPDATE
        await page.getByRole('button', {
            name: 'Editar'
        }).first().click();

        await page.getByRole('textbox', {
            name: /Nome da Área/i
        }).fill('Área aleatória 123');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        await expect(
            page.getByText('Área aleatória 123').first()
        ).toBeVisible();

        // DELETE
        await page.getByRole('textbox', {
            name: /Pesquisar área/i
        }).fill('Área aleatória 123');

        await page.getByRole('button', {
            name: 'Excluir'
        }).first().click();

        await page.getByRole('button', {
            name: 'Excluir'
        }).click();

    });

});