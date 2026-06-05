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

    await page.getByRole('option').nth(5).click();

    await page.getByRole('button', {
        name: 'Salvar'
    }).click();

    // ====================
    // READ
    // ====================

    await expect(
        page.getByText(disciplinaInicial).first()
    ).toBeVisible();

    // ====================
    // UPDATE
    // ====================

    await page.getByRole('button', {
        name: 'Editar'
    }).last().click();

    await page.getByRole('textbox', {
        name: 'Nome da disciplina: *'
    }).fill(disciplinaEditada);

    await page.getByRole('button', {
        name: 'Salvar'
    }).click();

    await expect(
        page.getByText(disciplinaEditada).first()
    ).toBeVisible();

    // ====================
    // DELETE
    // ====================

    await page.getByRole('button', {
        name: 'Excluir'
    }).last().click();

    await page.getByRole('button', {
        name: 'Excluir'
    }).click();

    });

});