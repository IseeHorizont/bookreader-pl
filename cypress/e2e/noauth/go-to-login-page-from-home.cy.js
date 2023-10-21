describe('Проверка перехода на страницу логина с главной страницы',
    { testIsolation: false }, () => {

        it('Открытие главной страницы', () => {
            cy.visit('http://localhost:3000');
        })

        it('Нажатие на кнопку "Войти" и переход на страницу входа в аккаунт', () => {
            cy.get('button').filter(':contains("Войти")')
                .click();
            cy.url().should('contain', 'login');
        })
})