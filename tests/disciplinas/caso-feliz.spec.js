import { test, expect } from '@playwright/test';

test.describe('Caso Feliz - CRUD de Disciplinas', () => {

test('Deve criar, visualizar, editar e excluir uma disciplina', async ({ page }) => {

    const timestamp = Date.now();

    const disciplinaInicial = `Design ${timestamp}`;
    const disciplinaEditada = `Design Editado ${timestamp}`;

    await page.goto('https://app.avaliei.com.br/dashboard');

    await page.getByRole('button', {
        name: 'Disciplinas'
    }).click();

    await page.getByRole('link', {
        name: 'Disciplinas'
    }).click();

    // ====================
    // CREATE
    // ====================

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

    // ====================
    // READ
    // ====================

    await page.getByRole('textbox', {
        name: 'Pesquisar disciplina...'
    }).fill(disciplinaInicial);
            
    await expect(
        page.getByText(disciplinaInicial)
    ).toBeVisible();

    // ====================
    // UPDATE
    // ====================

    await page.getByRole('button', {
        name: 'Editar'
    }).first().click();

    await page.getByRole('textbox', {
        name: 'Nome da disciplina: *'
    }).fill(disciplinaEditada);

    await page.getByRole('button', {
        name: 'Salvar'
    }).click();

    // READ
    await page.getByRole('button', {
        name: 'Limpar pesquisa'
    }).click();
    
    await page.getByRole('textbox', {
        name: 'Pesquisar disciplina...'
    }).fill(disciplinaEditada);
            
    await expect(
        page.getByText(disciplinaEditada)
    ).toBeVisible();

    // ====================
    // DELETE
    // ====================

    await page.getByRole('button', {
        name: 'Excluir'
    }).first().click();

    await page.getByRole('button', {
        name: 'Excluir'
    }).click();

    });

});