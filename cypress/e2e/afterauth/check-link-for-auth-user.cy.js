import { testUser } from "../test-user";

describe('Проверка доступности перехода на полную страницу события для авторизованного пользователя',
    { testIsolation: false }, () => {

        it('Переход на главную', () => {
            cy.visit('http://localhost:3000');
        })

        it('Нажатие на кнопку "Войти" и переход на страницу входа в аккаунт', () => {
            cy.get('button')
                .filter(':contains("Войти")')
                .click();
            cy.url().should('contain', 'login');
        })

        it('Вход в аккаунт с верными логином и паролем пользователя', () => {
            cy.get('input[name="email"]').clear()
                .type(testUser.email);
            cy.get('input[name="password"]').clear()
                .type(testUser.password);
            cy.get('button')
                .filter('[type="submit"]')
                .click();
            cy.url().should('not.contain', 'login');
        })

        it('Выбор первого события из списка и переход на полную страницу события', () => {
            cy.get('[class^="Event_root"]')
                .first()
                .within(($item) => {
                    cy.get('a[href*="event"]')
                        .click();
                })

            cy.url().should('contain', '/event/');
        })

        it('Выход из аккаунта', () => {
            cy.get('button')
                .filter(':contains("Выйти")')
                .click();
        })

})