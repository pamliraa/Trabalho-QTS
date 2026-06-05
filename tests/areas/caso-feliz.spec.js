import { test, expect } from '@playwright/test';

test.describe('Caso Triste - Áreas', () => {

    test('Deve validar ações inválidas na tela de Áreas', async ({ page }) => {

        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Áreas'
        }).click();

        // CASO TRISTE 1 - SALVAR SEM PREENCHER NADA
        await page.getByRole('button', { name: 'Adicionar área' }).click();

        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(
            page.getByText(/campo obrigatório/i).first()
        ).toBeVisible();

        // CASO TRISTE 2 - EDITAR E SALVAR SEM ALTERAR
        await page.getByRole('button', { name: 'Editar' }).first().click();

        await page.getByRole('button', { name: 'Salvar' }).click();

        await expect(
            page.getByText(/campo obrigatório|erro/i).first()
        ).toBeVisible();

        // CASO TRISTE 3 - CANCELAR EXCLUSÃO
        await page.getByRole('button', { name: 'Excluir' }).first().click();

        await page.getByRole('button', { name: /cancelar|não/i }).click();

        await expect(page.locator('tbody')).toBeVisible();

    });

});