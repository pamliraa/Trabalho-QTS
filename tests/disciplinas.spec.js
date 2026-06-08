import { test, expect } from '@playwright/test';

test.describe('Caso de Borda - Disciplina', () => {

    test('Deve validar 125 caracteres no nome da disciplina', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE DISCIPLINAS
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Disciplinas'
        }).click();

        // CREATE - 125 CARACTERES
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
            name: 'Matemática e suas tecnologias'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

    });

    test('Deve validar 126 caracteres no nome da disciplina', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE DISCIPLINAS
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Disciplinas'
        }).click();

        // CREATE - 126 CARACTERES
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
            name: 'Matemática e suas tecnologias'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // VALIDAR MENSAGEM DE ERRO
        await expect(
            page.getByText('O campo nome da disciplina não pode ser superior a 125 caracteres.')
        ).toBeVisible();

    });

});

test.describe('Caso Feliz - Disciplinas', () => {

    test('Deve criar uma disciplina', async ({ page }) => {

        const timestamp = Date.now();

        const disciplinaInicial = `Design ${timestamp}`;

        await page.goto('https://app.avaliei.com.br/dashboard');

        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Disciplinas'
        }).click();

        // CREATE
        await page.getByRole('button', {
            name: 'Adicionar disciplina'
        }).click();

        await page.getByRole('textbox', {
            name: 'Nome da disciplina: *'
        }).fill(disciplinaInicial);

        await page.getByRole('button', {
            name: /Selecione a área da disciplina/i
        }).click();

        await page.getByRole('option', {
            name: 'Formação técnica e profissional'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();
    });

    test('Deve excluir uma disciplina', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Disciplinas'
        }).click();

        // DELETE
        await page.getByRole('button', {
            name: 'Excluir'
        }).first().click();

        await page.getByRole('button', {
            name: 'Excluir'
        }).click();

    });
});

test.describe('Caso Triste - Disciplina', () => {

    test('Deve validar campos obrigatórios - sem registros', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE DISCIPLINAS
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Disciplinas'
        }).click();

        // SALVAR SEM PREENCHER NADA
        await page.getByRole('button', {
            name: 'Adicionar disciplina'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagens de erro
        await expect(
            page.getByText('Este campo é obrigatório')
                .first()
        ).toBeVisible();
    });

    test('Deve validar campos obrigatórios', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE DISCIPLINAS
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Disciplinas'
        }).click();

        // PREENCHER APENAS A ÁREA
        await page.getByRole('button', {
            name: 'Adicionar disciplina'
        }).click();
        
        await page.getByRole('button', {
            name: 'Selecione a área da disciplina'
        }).click();

        await page.getByRole('option', {
            name: 'Matemática e suas tecnologias'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Nome continua obrigatório
        await expect(
            page.getByText('Este campo é obrigatório')
                .first()
        ).toBeVisible();

    });
});