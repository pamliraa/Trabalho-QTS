import { test, expect } from '@playwright/test';

test.describe('Caso Triste - Campos obrigatórios da Disciplina', () => {

    test('Deve validar campos obrigatórios', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR TELA DE DISCIPLINAS
        await page.getByRole('button', {
            name: 'Disciplinas'
        }).click();

        await page.getByRole('link', {
            name: 'Disciplinas'
        }).click();

        // CASO TRISTE 1 - SALVAR SEM PREENCHER NADA
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

        // CASO TRISTE 2 - PREENCHER APENAS A ÁREA
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