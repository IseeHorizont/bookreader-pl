import { testUser } from "../test-user";

describe('Проверка авторизации с верными учётными данными',
    { testIsolation: false }, () => {

        it('Переход на главную', () => {
            cy.visit('http://localhost:3000');
        })

        it('Нажатие на кнопку "Войти" и переход на страницу входа в аккаунт', () => {
            cy.get('button').filter(':contains("Войти")')
                .click();
            cy.url().should('contain', 'login');
        })

        it('Вход в аккаунт с верными логином и паролем пользователя', () => {
            cy.get('input[name="email"]').clear().type(testUser.email);
            cy.get('input[name="password"]').clear().type(testUser.password);
            cy.get('button')
                .filter('[type="submit"]')
                .click();
            cy.url().should('not.contain', 'login');

            cy.get('button').filter(':contains("Выйти")')
                .click();
        })

    })