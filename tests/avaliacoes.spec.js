import { test, expect } from '@playwright/test';

test.describe('Caso de Borda - Avaliações', () => {

    test('Deve validar descrição com 125 caracteres', async ({ page }) => {

        const descricao125 = 'a'.repeat(125);

        // Usuário já está autenticado pelo globalSetup
        await page.goto('https://app.avaliei.com.br/dashboard');

        await page.getByRole('link', {
            name: 'Avaliações'
        }).click();

        // BORDA 125 CARACTERES
        await page.getByRole('button', {
            name: 'Criar Avaliação'
        }).click();

        await page.getByRole('textbox', {
            name: 'Descrição da avaliação: *'
        }).fill(descricao125);

        await page.getByRole('button', {
            name: 'Professor'
        }).click();

        await page.getByRole('option').first().click();

        await page.getByRole('combobox', {
            name: /Selecionar disciplina/i
        }).click();

        await page.getByRole('option').first().click();

        await page.getByRole('spinbutton', {
            name: /Quantidade de questões/i
        }).fill('10');

        await page.locator('div')
            .filter({ hasText: /^Selecionar turmas$/ })
            .nth(1)
            .click();

        await page.getByRole('option').first().click();

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        await expect(
            page.getByText(descricao125)
        ).not.toBeVisible();

    });

    test('Deve validar descrição com 126 caracteres', async ({ page }) => {

        const descricao126 = 'a'.repeat(126);

        // Usuário já está autenticado pelo globalSetup
        await page.goto('https://app.avaliei.com.br/dashboard');

        await page.getByRole('link', {
            name: 'Avaliações'
        }).click();

        // BORDA 126 CARACTERES
        await page.getByRole('button', {
            name: 'Criar Avaliação'
        }).click();

        await page.getByRole('textbox', {
            name: 'Descrição da avaliação: *'
        }).fill(descricao126);

        await page.getByRole('button', {
            name: 'Professor'
        }).click();

        await page.getByRole('option').first().click();

        await page.getByRole('combobox', {
            name: /Selecionar disciplina/i
        }).click();

        await page.getByRole('option').first().click();

        await page.getByRole('spinbutton', {
            name: /Quantidade de questões/i
        }).fill('10');

        await page.locator('div')
            .filter({ hasText: /^Selecionar turmas$/ })
            .nth(1)
            .click();

        await page.getByRole('option').first().click();

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        await expect(
            page.getByText('O campo descrição não pode ser superior a 125 caracteres.')
        ).toBeVisible();
    });

});

test.describe('Caso Feliz - CRUD de Avaliações', () => {

    test('Deve criar e excluir uma avaliação', async ({ page }) => {

        const descricaoInicial = 'Muito dificil';

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR AVALIAÇÕES
        await page.getByRole('link', {
            name: 'Avaliações'
        }).click();

        // CREATE
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
        await page.getByRole('textbox', {
            name: /Prazo de Elaboração/i
        }).fill('03/06/2026');

        await page.getByRole('textbox', {
            name: /Data de aplicação/i
        }).fill('10/06/2026');

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();
    });

    test('Deve criar e excluir uma avaliação', async ({ page }) => {

        const descricaoInicial = 'Muito dificil';

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR AVALIAÇÕES
        await page.getByRole('link', {
            name: 'Avaliações'
        }).click();

        // DELETE
        await page.getByRole('button', {
            name: /Mais Ações/i
        }).first().click();

        await page.getByRole('menuitem', {
            name: 'Excluir'
        }).click();
    });
});

test.describe('Caso Triste - Avaliação', () => {

    test('Deve validar campos obrigatórios', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR AVALIAÇÕES
        await page.getByRole('link', {
            name: 'Avaliações'
        }).click();

        // SALVAR SEM NADA
        await page.getByRole('button', {
            name: 'Criar Avaliação'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        await expect(
            page.getByText('É necessário ter pelo menos um bloco completo')
        ).toBeVisible();
    });

    test('Deve validar  bloco incompleto', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR AVALIAÇÕES
        await page.getByRole('link', {
            name: 'Avaliações'
        }).click();

        // BLOCO PREENCHIDO, MAS AVALIAÇÃO NÃO
        await page.getByRole('button', {
            name: 'Professor'
        }).click();

        await page.getByRole('option')
            .first()
            .click();

        await page.getByRole('combobox', {
            name: /Selecionar disciplina/i
        }).click();

        await page.getByRole('option')
            .first()
            .click();

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        await expect(
            page.getByText('Por favor, corrija os erros no formulário.')
        ).toBeVisible();

    });
});