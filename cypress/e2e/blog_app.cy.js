describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('/')
  })

  it('Login form is shown', function() {
    cy.contains('log in to the application')
    cy.contains('username')
      .get('input[name="Username"]')
    cy.contains('password')
      .get('input[name="Password"]')
    cy.get('button[type="submit"]').contains('login')
  })
})
