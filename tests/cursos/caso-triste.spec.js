import { test, expect } from '@playwright/test';

test.describe('Caso Triste - Validação de campos obrigatórios do Curso', () => {

    test('Deve validar cadastro sem dados, sem escolaridade e sem nome', async ({ page }) => {

        await page.goto('https://app.avaliei.com.br/dashboard');

        await page.getByRole('button', {
            name: 'Turmas'
        }).click();

        await page.getByRole('link', {
            name: 'Cursos'
        }).click();

        // CASO TRISTE 1 - SALVAR SEM PREENCHER NADA
        await page.getByRole('button', {
            name: 'Adicionar Curso'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(
            page.locator('#curso-nome-error')
        ).toHaveText('Este campo é obrigatório');
        
        await expect(
            page.locator('#curso-nivel-error')
        ).toHaveText('Selecione o nível de escolaridade');

        // CASO TRISTE 2 - SEM ESCOLARIDADE
        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).fill('Redes');

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(
            page.locator('#curso-nivel-error')
        ).toHaveText('Selecione o nível de escolaridade');

        // CASO TRISTE 3 - SEM NOME
        await page.getByRole('textbox', {
            name: 'Nome do Curso: *'
        }).clear();

        await page.getByRole('button', {
            name: 'Nível de Escolaridade'
        }).click();

        await page.getByRole('option', {
            name: 'Pós-Graduação'
        }).click();

        await page.getByRole('button', {
            name: 'Salvar'
        }).click();

        // Validar mensagem de erro
        await expect(
            page.locator('#curso-nome-error')
        ).toHaveText('Este campo é obrigatório');

    });

});