import { test, expect } from '@playwright/test';

test.describe('Caso Triste - Campos obrigatórios das Áreas', () => {

    test('Deve validar campos obrigatórios e ações inválidas', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE ÁREAS
         await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Áreas'
        }).click();


        // CASO TRISTE 1 - CRIAR ÁREA SEM PREENCHER NADA
        await page.getByRole('button', { name: 'Adicionar área' }).click();
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(
            page.getByText(/este campo é obrigatório/i).first()
        ).toBeVisible();

        // PREENCHER E CRIAR UMA ÁREA PARA PODER EDITAR/EXCLUIR
        await page.getByRole('textbox').first().fill('Área Teste E2E');
        await page.getByRole('button', { name: 'Salvar' }).click();

        // CASO TRISTE 2 - EDITAR SEM ALTERAR NADA E SALVAR
        await page.getByRole('button', { name: 'Editar' }).last().click();
        await page.getByRole('textbox').first().clear();
        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(
            page.getByText(/este campo é obrigatório/i).first()
        ).toBeVisible();

        // FECHAR MODAl
        await page.getByRole('button', { name: 'Close' }).click();

        // CASO TRISTE 3 - ABRIR EXCLUSÃO E CANCELAR
        await page.getByRole('button', { name: 'Excluir', exact: true }).first().click();
        await page.getByRole('button', { name: /cancelar|não/i }).click();

        // Valida que o item ainda existe na lista
        await expect(
            page.locator('tbody')
        ).toBeVisible();

    });

});