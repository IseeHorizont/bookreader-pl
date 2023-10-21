describe('Проверка перехода на страницу регистрации с главной страницы',
    { testIsolation: false }, () => {

        it('Открытие главной страницы', () => {
            cy.visit('http://localhost:3000');
        })

        it('Нажатие на кнопку "Регистрация" и переход на страницу регистрации аккаунта', () => {
            cy.get('button').filter(':contains("Регистрация")')
                .click();
            cy.url().should('contain', 'register');
        })
})