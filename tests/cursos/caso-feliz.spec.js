import { test, expect } from '@playwright/test';

test.describe('Caso Feliz - CRUD de Cursos', () => {

    test('Deve criar, visualizar, editar e excluir um curso', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

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
        }).fill('Desenvolvimento de Sistemasss');

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
        }).fill('Desenvolvimento de Sistemasss');

        await expect(
            page.getByText('Desenvolvimento de Sistemasss')
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