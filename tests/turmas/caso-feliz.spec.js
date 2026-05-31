import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test.describe('Caso Feliz - CRUD de Turmas', () => {

    test('Deve criar, visualizar, editar e excluir uma turma', async ({ page }) => {

        // LOGIN
        const secret = 'ZFKZGKE3DTP4COGC';
        const otp = authenticator.generate(secret);

        await page.goto('https://app.avaliei.com.br/login');

        await page.getByRole('textbox', { name: 'Email' })
            .fill('e2e-super-teacher-39@example.com');

        await page.getByRole('textbox', { name: 'Senha' })
            .fill('password');

        await page.getByRole('button', { name: 'Entrar' })
            .click();

        await page.getByRole('textbox', {
            name: /Código de verificação/i
        }).fill(otp);

        await page.getByRole('button', {
            name: /Verificar código/i
        }).click();

        await expect(page).toHaveURL(/dashboard/);

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
        await page.getByRole('button', { 
          name: 'Opções' 
        }).nth(0).click();

        await page.getByRole('menuitem', {
            name: 'Editar'
        }).click();
        
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
            name: /^Opções$/
        }).click();

        await page.getByRole('menuitem', {
            name: 'Excluir'
        }).click();

        await page.getByRole('button', {
            name: 'Excluir'
        }).click();
    });

});