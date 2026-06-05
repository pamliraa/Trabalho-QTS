import { test, expect } from '@playwright/test';

test.describe('Caso de Borda - Campo Sala', () => {

    test('Deve validar 20 e 21 caracteres no campo sala', async ({ page }) => {

        const sala20 = 'a'.repeat(20);
        const sala21 = 'a'.repeat(21);

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE TURMAS
        await page.getByRole('button', { name: 'Turmas' }).click();
        await page.getByRole('link', { name: 'Turmas' }).click();

        // CREATE - 20 CARACTERES
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

        await page.getByLabel('ª Série / 2º Semestre')
            .getByText('ª Série / 2º Semestre')
            .click();

        await page.getByRole('combobox', {
            name: 'Turno: campo obrigatório'
        }).click();

        await page.getByLabel('Matutino')
            .getByText('Matutino')
            .click();

        await page.getByRole('textbox', {
            name: 'Sala:'
        }).fill(sala20);

        await page.getByRole('textbox', {
            name: 'Descrição:'
        }).fill('Teste borda');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // CREATE - 21 CARACTERES
        await page.getByRole('button', {
            name: 'Adicionar nova turma'
        }).click();

        await page.getByRole('button', {
            name: 'Curso'
        }).click();

        await page.getByLabel('Suggestions')
            .getByText('Ensino Regular')
            .click();

        await page.getByRole('textbox', {
            name: 'Ano: *'
        }).fill('2026');

        await page.getByRole('combobox', {
            name: 'Série ou semestre da turma:'
        }).click();

        await page.getByLabel('ª Série / 2º Semestre')
            .click();

        await page.getByRole('combobox', {
            name: 'Turno: campo obrigatório'
        }).click();

        await page.getByLabel('Integral')
            .click();

        await page.getByRole('textbox', {
            name: 'Sala:'
        }).fill(sala21);

        await page.getByRole('textbox', {
            name: 'Descrição:'
        }).fill('Teste borda');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        await expect(
            page.getByText('O campo sala não pode ser superior a 20 caracteres')
        ).toBeVisible();

    });

});