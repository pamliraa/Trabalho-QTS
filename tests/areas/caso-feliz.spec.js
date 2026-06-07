import { test, expect } from '@playwright/test';

test.describe('Caso Feliz - CRUD de Áreas', () => {

    test('Deve criar, visualizar, editar e excluir uma área', async ({ page }) => {

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

        // READ
        await page.getByRole('textbox', {
            name: 'Pesquisar área...'
        }).fill("Área criada");

        await expect(
            page.getByText("Área criada")
        ).toBeVisible();

        // UPDATE
        await page.getByRole('button', {
            name: 'Editar'
        }).first().click();

        await page.getByRole('textbox', {
            name: 'Nome da Área:'
        }).fill("Área editada principal");

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // READ
        await page.getByRole('button', {
            name: 'Limpar pesquisa'
        }).click();

        await page.getByRole('textbox', {
            name: 'Pesquisar área...'
        }).fill("Área editada principal");

        await expect(
            page.getByText("Área editada principal")
        ).toBeVisible();

        // DELETE
        await page.getByRole('button', {
            name: 'Excluir'
        }).first().click();

        await page.getByRole('button', {
            name: 'Excluir'
        }).click();

    });

});