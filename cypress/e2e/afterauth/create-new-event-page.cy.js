import { testUser } from "../test-user";

describe('Проверка доступности создания нового события для авторизованного пользователя',
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

        it('Нажатие на кнопку "Создать событие" и переход на страницу создания нового события', () => {
            cy.get('button')
                .filter(':contains("Создать событие")')
                .click();
            cy.url().should('contain', '/event/');
        })

        it('Выход из аккаунта', () => {
            cy.get('button')
                .filter(':contains("Выйти")')
                .click();
        })
})
