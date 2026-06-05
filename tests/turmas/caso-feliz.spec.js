import { test, expect } from '@playwright/test';

test.describe('Caso Feliz - CRUD de Turmas', () => {

    test('Deve criar, visualizar, editar e excluir uma turma', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE TURMAS
        await page.getByRole('button', { name: 'Turmas' }).click();
        await page.getByRole('link', { name: 'Turmas' }).click();

        // CREATE
        await page.getByRole('button', {
            name: 'Adicionar nova turma'
        }).click();

        await page.getByRole('button', {
            name: 'Curso'
        }).click();

        await page.getByLabel('Suggestions')
            .getByText('Fisioterapia')
            .click();

        await page.getByRole('textbox', {
            name: 'Ano: *'
        }).fill('2026');

        await page.getByRole('combobox', {
            name: 'Série ou semestre da turma:'
        }).click();

        await page.getByLabel('ª Série / 1º Semestre')
            .getByText('ª Série / 1º Semestre')
            .click();

        await page.getByRole('combobox', {
            name: 'Turno: campo obrigatório'
        }).click();

        await page.getByLabel('Matutino')
            .getByText('Matutino')
            .click();

        await page.getByRole('textbox', {
            name: 'Sala:'
        }).fill('25');

        await page.getByRole('textbox', {
            name: 'Descrição:'
        }).fill('Teste criado');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // READ
        await page.getByRole('textbox', {
            name: 'Pesquisar turma...'
        }).fill('Teste criado');

        await expect(page.getByText('Teste criado')).toBeVisible();

        // UPDATE
        const primeiraLinha = page.locator('tbody tr').first();

        await primeiraLinha.getByRole('button', { 
            name: /Opções/i 
        }).click();

        await page.getByRole('menuitem', { 
            name: 'Editar' 
        }).click({ force: true });
        
        await page.getByRole('textbox', {
            name: 'Descrição:'
        }).fill('Teste editado');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // READ
        await page.getByRole('textbox', {
            name: 'Pesquisar turma...'
        }).clear();

        await page.getByRole('textbox', {
            name: 'Pesquisar turma...'
        }).fill('Teste editado');

        // DELETE
        await page.getByRole('button', {
            name: /Opções/i
        }).click();

        await page.getByRole('menuitem', {
            name: 'Excluir'
        }).click();

        await page.getByRole('button', {
            name: 'Excluir'
        }).click();
    });

});
