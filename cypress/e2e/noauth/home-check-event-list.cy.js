describe('Проверка вывода списка событий на главной странице',
    { testIsolation: false }, () => {

  it('Переход на главную', () => {
    cy.visit('http://localhost:3000')
  })

  it('Tab "Все". Проверка списка событий на не пустоту', () => {
    cy.get('button').filter(':contains("Все")')
        .click();
    cy.get('[class^="Event_root"]')
        .should('have.length.at.least', 1)
  })

  it('Tab "Новые". Проверка списка событий на не пустоту', () => {
    cy.get('button').filter(':contains("Новые")')
        .click();
    cy.get('[class^="Event_root"]')
            .should('have.length.at.least', 1)
  })

  it('Tab "Популярные". Проверка списка событий на не пустоту', () => {
        cy.get('button').filter(':contains("Популярные")')
            .click();
        cy.get('[class^="Event_root"]')
            .should('have.length.at.least', 1)
  })
})