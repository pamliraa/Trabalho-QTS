import { test, expect } from '@playwright/test';

test.describe('Caso de Borda - Cursos', () => {

    test('Deve validar cadastro com 125 caracteres', async ({ page }) => {

        const nome125 = 'i'.repeat(125);

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE CURSOS
        await page.getByRole('button', {
            name: 'Turmas'
        }).click();

        await page.getByRole('link', {
            name: 'Cursos'
        }).click();

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

        await page.getByRole('textbox', {
            name: 'Pesquisar curso...'
        }).fill(nome125);

        await expect(page.getByText(nome125)).toBeVisible();
    });

    test('Deve validar cadastro com 126 caracteres', async ({ page }) => {

        const nome126 = 'i'.repeat(126);

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE CURSOS
        await page.getByRole('button', {
            name: 'Turmas'
        }).click();

        await page.getByRole('link', {
            name: 'Cursos'
        }).click();

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

test.describe('Caso Feliz - Cursos', () => {

    test('Deve criar um curso', async ({ page }) => {

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
    });

    test('Deve excluir um curso', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE CURSOS
        await page.getByRole('button', {
            name: 'Turmas'
        }).click();

        await page.getByRole('link', {
            name: 'Cursos'
        }).click();

        // READ
        await page.getByRole('textbox', {
            name: 'Pesquisar curso...'
        }).fill('Desenvolvimento de Sistemasss');

        await expect(
            page.getByText('Desenvolvimento de Sistemasss')
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

test.describe('Caso Triste - Cursos', () => {

    test('Deve validar cadastro sem dados', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE CURSOS
        await page.getByRole('button', {
            name: 'Turmas'
        }).click();

        await page.getByRole('link', {
            name: 'Cursos'
        }).click();

        // SALVAR SEM PREENCHER NADA
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(
            page.locator('#curso-nome-error')
        ).toHaveText('Este campo é obrigatório');
        
        await expect(
            page.locator('#curso-nivel-error')
        ).toHaveText('Selecione o nível de escolaridade');
    });

    test('Deve validar cadastro sem escolaridade', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE CURSOS
        await page.getByRole('button', {
            name: 'Turmas'
        }).click();

        await page.getByRole('link', {
            name: 'Cursos'
        }).click();

        // SEM ESCOLARIDADE
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();
        
        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill('Redes');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(
            page.locator('#curso-nivel-error')
        ).toHaveText('Selecione o nível de escolaridade');

    });

});

