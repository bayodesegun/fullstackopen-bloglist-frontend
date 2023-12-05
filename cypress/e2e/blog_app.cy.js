describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'test123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
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

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('testuser')
      cy.get('input[name="Password"]').type('test123')
      cy.get('button[type="submit"]').click()

      cy.get('.success.notification')
        .contains('Logged in as Test User')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Blogs fetched successfully')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('.page-header').contains('blogs')
      cy.get('.logged-in-user')
        .contains('Test User is logged in')
        .get('button')
        .contains('logout')

      cy.contains('new blog')

      cy.get('.blog-list')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('tester')
      cy.get('input[name="Password"]').type('test123')
      cy.get('button[type="submit"]').click()

      cy.get('.error.notification')
        .contains('Invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})
