import { test, expect } from '@playwright/test';

test.describe('Caso Feliz - CRUD de Avaliações', () => {

    test('Deve criar, visualizar, editar e excluir uma avaliação', async ({ page }) => {

        const descricaoInicial = 'Muito dificil';
        const descricaoEditada = 'Muito dificilll';

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR AVALIAÇÕES
        await page.getByRole('link', {
            name: 'Avaliações'
        }).click();

        // ====================
        // CREATE
        // ====================

        await page.getByRole('button', {
            name: 'Criar Avaliação'
        }).click();

        await page.getByRole('textbox', {
            name: 'Descrição da avaliação: *'
        }).fill(descricaoInicial);

        await page.getByText('Selecionar turmas').click();

        await page.getByRole('option')
            .first()
            .click();

        await page.locator('div')
            .filter({ hasText: /^Selecionar marcadores$/ })
            .nth(1)
            .click();

        await page.getByRole('option', {
            name: '2º Bimestre'
        }).click();

         await page.getByRole('combobox', {
            name: /Forma ordenação/i
        }).click();

        await page.getByRole('option', {
            name: 'Misturar questões do bloco',
            exact: true
        }).click();

        await page.getByRole('combobox', {
            name: /Modo/i
        }).click();

        await page.getByRole('option', {
            name: 'Convencional'
        }).click();

        await page.getByRole('combobox', {
            name: /Blocos objetivos/i
        }).click();

        await page.getByRole('option', {
            name: '1',
            exact: true
        }).click();

        await page.locator('div')
            .filter({ hasText: /^Selecionar áreas$/ })
            .nth(2)
            .click();

        await page.getByRole('option', {
            name: /Ciências humanas/
        }).click();

        await page.getByRole('button', {
            name: 'Professor'
        }).click();

        await page.getByRole('option', {
            name: 'E2e Super Teacher 11'
        }).click();

        await page.getByRole('combobox', {
            name: /Selecionar disciplina/i
        }).click();

        await page.getByRole('option', {
            name: 'Sociologia'
        }).click();

        await page.getByRole('spinbutton', {
            name: /Quantidade de questões para/i
        }).fill('12');

        // Datas
// Datas
        await page.getByRole('textbox', {
            name: /Prazo de Elaboração/i
        }).fill('03/06/2026');

        await page.getByRole('textbox', {
            name: /Data de aplicação/i
        }).fill('10/06/2026');

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        // ====================
        // READ
        // ====================

        await expect(
            page.getByText(descricaoInicial).first()
        ).toBeVisible();

        // ====================
        // UPDATE
        // ====================

        await page.getByRole('button', {
            name: /Mais Ações/i
        }).first().click();

        await page.getByRole('menuitem', {
            name: 'Editar'
        }).click();

        await page.getByRole('textbox', {
            name: 'Descrição da avaliação: *'
        }).fill(descricaoEditada);

        await page.getByRole('button', {
            name: 'Salvar Alterações'
        }).click();

        await expect(
            page.getByText(descricaoEditada).first()
        ).toBeVisible();

        // ====================
        // DELETE
        // ====================

        await page.getByRole('button', {
            name: /Mais Ações/i
        }).first().click();

        await page.getByRole('menuitem', {
            name: 'Excluir'
        }).click();
    });

});