import { test, expect } from '@playwright/test';

test.describe('Caso Triste - Validações da Avaliação', () => {

    test('Deve validar campos obrigatórios e bloco incompleto', async ({ page }) => {

        // Usuário já autenticado pelo globalSetup
        await page.goto('https://app.avaliei.com.br/dashboard');

        // ACESSAR AVALIAÇÕES
        await page.getByRole('link', {
            name: 'Avaliações'
        }).click();

        // CASO TRISTE 1 - SALVAR SEM NADA
        await page.getByRole('button', {
            name: 'Criar Avaliação'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar avaliação'
        }).click();

        await expect(
            page.getByText('É necessário ter pelo menos um bloco completo')
        ).toBeVisible();

        // CASO TRISTE 2 - BLOCO PREENCHIDO, MAS AVALIAÇÃO NÃO
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