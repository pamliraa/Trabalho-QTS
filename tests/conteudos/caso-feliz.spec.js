import { test, expect } from '@playwright/test';

test.describe('Caso Feliz - CRUD de Conteúdos', () => {

    test('Deve criar, visualizar, editar e excluir um conteúdo', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Conteúdos'
        }).click();

        // CREATE
        await page.getByRole('button', {
            name: 'Adicionar Conteúdo'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do conteúdo: *'
        }).fill('Conteúdo criadooo');

        await page.getByRole('button', {
            name: 'Disciplina'
        }).click();

        await page.getByRole('option').first().click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // READ
        await page.getByRole('textbox', {
            name: 'Pesquisar conteúdo...'
        }).fill('Conteúdo criadooo');
        
        await expect(
            page.getByText('Conteúdo criadooo')
        ).toBeVisible();

        // UPDATE
        await page.getByRole('button', {
            name: 'Editar'
        }).first().click();

        await page.getByRole('textbox', {
            name: 'Nome do conteúdo: *'
        }).fill('Conteúdo editadooo');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // READ
        await page.getByRole('button', {
            name: 'Limpar pesquisa'
        }).click();

        await page.getByRole('textbox', {
            name: 'Pesquisar conteúdo...'
        }).fill('Conteúdo editadooo');
        
        await expect(
            page.getByText('Conteúdo editadooo')
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