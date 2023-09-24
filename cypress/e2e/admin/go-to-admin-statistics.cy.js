import { testAdmin } from "../test-user";

describe('Проверка доступности раздела статистики для администратора',
    { testIsolation: false }, () => {

        it('Переход на главную', () => {
            cy.visit('http://localhost:3000');
        })

        it('Нажатие на кнопку "Войти" и переход на страницу входа в аккаунт', () => {
            cy.get('button').filter(':contains("Войти")')
                .click();
            cy.url().should('contain', 'login');
        })

        it('Вход в аккаунт с логином и паролем администратора', () => {
            cy.get('input[name="email"]').clear().type(testAdmin.email);
            cy.get('input[name="password"]').clear().type(testAdmin.password);
            cy.get('button')
                .filter('[type="submit"]')
                .click();

            cy.url().should('not.contain', 'login');
        })

        it('Переход на страницу статистики сервиса', () => {
            cy.get('a[href*="statistics"]')
                .should('exist')
                .click()

            cy.url().should('contain', '/statistics');
        })

        it('Выход из аккаунта', () => {
            cy.get('button')
                .filter(':contains("Выйти")')
                .click();
        })
    })