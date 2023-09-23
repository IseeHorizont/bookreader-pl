describe('Проверка вывода списка событий на главной странице',
    { testIsolation: false }, () => {

  it('Переход на главную', () => {
    cy.visit('http://localhost:3000')
  })

  it('Проверка списка событий на не пустоту', () => {
    cy.get('[class^="Event_root"]')
        .should('have.length.at.least', 1)
  })
})