import { test, expect } from '@playwright/test';

test.describe('Caso de Borda - Limite de caracteres no cadastro de cursos', () => {

    test('Deve validar cadastro com 124, 125 e 126 caracteres', async ({ page }) => {

        const nome124 = 'i'.repeat(124);
        const nome125 = 'i'.repeat(125);
        const nome126 = 'i'.repeat(126);

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE CURSOS
        await page.getByRole('button', {
            name: 'Turmas'
        }).click();

        await page.getByRole('link', {
            name: 'Cursos'
        }).click();

        // CREATE - 124 CARACTERES
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill(nome124);

        await page.getByRole('button', {
            name: 'Nível de Escolaridade'
        }).click();

        await page.getByRole('option', {
            name: 'Técnico'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // READ
        await page.getByRole('textbox', {
            name: 'Pesquisar curso...'
        }).fill(nome124);

        await expect(page.getByText(nome124)).toBeVisible();

        // CREATE - 125 CARACTERES
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill(nome125);

        await page.getByRole('button', {
            name: 'Nível de Escolaridade'
        }).click();

        await page.getByRole('option', {
            name: 'Técnico'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        await expect(page.getByText(nome125)).toBeVisible();

        // CREATE - 126 CARACTERES
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill(nome126);

        await page.getByRole('button', {
            name: 'Nível de Escolaridade'
        }).click();

        await page.getByRole('option', {
            name: 'Técnico'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // VALIDAÇÃO DE ERRO
        await expect(
            page.getByText('O campo nome do curso não pode ser superior a 125 caracteres.')
        ).toBeVisible();

    });

});