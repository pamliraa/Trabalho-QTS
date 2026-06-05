import { test, expect } from '@playwright/test';

test.describe('Caso de Borda - Campo Nome da Disciplina', () => {

    test('Deve validar 125 e 126 caracteres no nome da disciplina', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE DISCIPLINAS
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Disciplinas'
        }).click();

        // ====================
        // CREATE - 125 CARACTERES
        // ====================

        await page.getByRole('button', {
            name: 'Adicionar disciplina'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome da disciplina: *'
        }).fill('a'.repeat(125));

        await page.getByRole('button', {
            name: 'Selecione a área da disciplina'
        }).click();

        await page.getByRole('option', {
            name: 'Área Teste 1779989273359'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // ====================
        // CREATE - 126 CARACTERES
        // ====================

        await page.getByRole('button', {
            name: 'Adicionar disciplina'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome da disciplina: *'
        }).fill('a'.repeat(126));

        await page.getByRole('button', {
            name: 'Selecione a área da disciplina'
        }).click();

        await page.getByRole('option', {
            name: 'Área Teste 1779989273359'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // VALIDAR MENSAGEM DE ERRO

        await expect(
            page.getByText(
                'O campo nome da disciplina não pode ser superior a 125 caracteres.'
            )
        ).toBeVisible();

    });

});