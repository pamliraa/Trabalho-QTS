import { test, expect } from '@playwright/test';

test.describe('Caso Triste - Campos obrigatórios da Turma', () => {

    test('Deve validar campos obrigatórios', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE TURMAS
        await page.getByRole('button', { name: 'Turmas' }).click();
        await page.getByRole('link', { name: 'Turmas' }).click();


        // CASO TRISTE 1 - SALVAR SEM PREENCHER NADA
        await page.getByRole('button', {
            name: 'Adicionar nova turma'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(page.locator('#classroom-course-error'))
            .toHaveText('Este campo é obrigatório');

        await expect(page.locator('#classroom-grade-error'))
            .toHaveText('Este campo é obrigatório');

        await expect(page.locator('#classroom-shift-error'))
            .toHaveText('Este campo é obrigatório');

        // CASO TRISTE 2 - APENAS CURSO E ANO
        await page.getByRole('button', {
            name: 'Curso'
        }).click();

        await page.getByLabel('Suggestions')
            .getByText('Fisioterapia')
            .click();

        await page.getByRole('textbox', {
            name: 'Ano: *'
        }).fill('2026');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(page.locator('#classroom-grade-error'))
            .toHaveText('Este campo é obrigatório');

        await expect(page.locator('#classroom-shift-error'))
            .toHaveText('Este campo é obrigatório');
        
    });

});