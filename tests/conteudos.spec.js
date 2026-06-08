import { test, expect } from '@playwright/test';

test.describe('Caso de Borda - Conteúdos', () => {

    test('Deve validar cadastro com 125 caracteres', async ({ page }) => {

        const nome125 = 'a'.repeat(125);

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Conteúdos'
        }).click();

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
    });

    test('Deve validar cadastro com 126 caracteres', async ({ page }) => {

        const nome126 = 'a'.repeat(126);

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Conteúdos'
        }).click();

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

test.describe('Caso Feliz - Conteúdos', () => {

    test('Deve criar um conteúdo', async ({ page }) => {

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
    });

    test('Deve excluir um conteúdo', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Conteúdos'
        }).click();

        // READ
        await page.getByRole('textbox', {
            name: 'Pesquisar conteúdo...'
        }).fill('Conteúdo criadooo');
        
        await expect(
            page.getByText('Conteúdo criadooo')
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

test.describe('Caso Triste - Conteúdos', () => {

    test('Deve validar campos obrigatórios', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Conteúdos'
        }).click();

        // SALVAR SEM PREENCHER NADA
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

    });

test('Deve validar campos duplicados', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Conteúdos'
        }).click();

        // CONTEÚDO DUPLICADO
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