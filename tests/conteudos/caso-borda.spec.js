import { test, expect } from '@playwright/test';

test.describe('Caso de Borda - Conteúdos', () => {

    test('Deve validar cadastro com 124, 125 e 126 caracteres', async ({ page }) => {

        const nome124 = 'a'.repeat(124);
        const nome125 = 'a'.repeat(125);
        const nome126 = 'a'.repeat(126);

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Conteúdos'
        }).click();

        // CREATE - 124 CARACTERES
        await page.getByRole('button', {
            name: 'Adicionar Conteúdo'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do conteúdo: *'
        }).fill(nome124);

        await page.getByRole('button', {
            name: 'Disciplina'
        }).click();

        await page.getByRole('option', {
            name: 'Biologia'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // VALIDAÇÃO
        await page.getByRole('textbox', {
            name: 'Pesquisar conteúdo...'
        }).fill(nome124);
                
        await expect(
            page.getByText(nome124)
        ).toBeVisible();
        
        // CREATE - 125 CARACTERES
        await page.getByRole('button', {
            name: 'Adicionar Conteúdo'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do conteúdo: *'
        }).fill(nome125);

        await page.getByRole('button', {
            name: 'Disciplina'
        }).click();

        await page.getByRole('option', {
            name: 'Biologia'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // VALIDAÇÃO
        await page.getByRole('button', {
            name: 'Limpar pesquisa'
        }).click();
        
        await page.getByRole('textbox', {
            name: 'Pesquisar conteúdo...'
        }).fill(nome125);
                
        await expect(
            page.getByText(nome125)
        ).toBeVisible();

        // CREATE - 126 CARACTERES
        await page.getByRole('button', {
            name: 'Adicionar Conteúdo'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome do conteúdo: *'
        }).fill(nome126);

        await page.getByRole('button', {
            name: 'Disciplina'
        }).click();

        await page.getByRole('option', {
            name: 'Biologia'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // VALIDAÇÃO DE ERRO
        await expect(
            page.getByText('O campo nome do conteúdo não pode ser superior a 125 caracteres.')
        ).toBeVisible();

    });

});