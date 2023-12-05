describe('Blog app', function() {
  beforeEach(function() {
    // Clear the database
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    // Create a new user
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'test123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    // Go to the home page
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

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      // Fill the form and submit
      cy.get('input[name="Username"]').type('testuser')
      cy.get('input[name="Password"]').type('test123')
      cy.get('button[type="submit"]').click()

      // Notifications should appear
      cy.get('.success.notification')
        .contains('Logged in as Test User')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Blogs fetched successfully')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      // UI elements that should be present when logged in
      cy.get('.page-header').contains('blogs')
      cy.get('.logged-in-user')
        .contains('Test User is logged in')
        .get('button')
        .contains('logout')

      cy.contains('new blog')

      cy.get('.blog-list')
        .children('.blog')
        .should('not.exist')
    })

    it('fails with wrong credentials', function() {
      // Fill the form
      cy.get('input[name="Username"]').type('tester')
      cy.get('input[name="Password"]').type('test123')
      cy.get('button[type="submit"]').click()

      // Should show an error notification
      cy.get('.error.notification')
        .contains('Invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'test123' })
    })

    it('A blog can be created', function() {
      // Click the new blog button
      cy.contains('new blog')
        .click()

      // Fill in the form and submit
      cy.get('input[name="Title"]').type('Test Blog')
      cy.get('input[name="Author"]').type('Test Author')
      cy.get('input[name="Url"]').type('http://test.com')
      cy.get('button[type="submit"]')
        .contains('create')
        .click()

      // Check that the blog was created
      cy.contains('Test Blog')
      cy.get('.blog-list')
        .children('.blog')
        .should('have.length', 1)
    })

    it('Can view and hide blog details', function() {
      // Create a blog
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
        user: JSON.parse(localStorage.getItem('user')).id
      })

      // Get the first blog in the list
      cy.get('.blog-list')
        .children('.blog')
        .first()
        .get('.blog-overview').as('blogOverview')
        .contains('Test Blog Test Author')

      // Click the 'view' details button
      cy.get('@blogOverview')
        .get('button')
        .contains('view')
        .click()

      // Now the overview should be hidden
      // and the details should be visible
      cy.get('@blogOverview')
        .should('not.exist')

      cy.get('.blog-details').as('blogDetails')
        .contains('Test Blog Test Author')

      // check other things that should be present
      // in the details view
      cy.get('@blogDetails')
        .contains('http://test.com')

      cy.get('@blogDetails')
        .get('button')
        .contains('hide')

      cy.get('@blogDetails')
        .get('.blog-user')
        .contains('Test User')

      cy.get('@blogDetails')
        .get('.delete-blog')
        .contains('remove')

      cy.get('@blogDetails')
        .get('.blog-likes').as('blogLikes')
        .contains('0 likes')

      // Hide the details
      cy.get('@blogDetails')
        .get('button')
        .contains('hide')
        .click()

      // Now the overview should be visible
      // and the details should be hidden
      cy.get('@blogOverview')
        .contains('Test Blog Test Author')

      cy.get('@blogOverview')
        .get('button')
        .contains('view')

      cy.get('@blogDetails')
        .should('not.exist')
    })

    it('A blog can be liked', function() {
      // Create a blog
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
        user: JSON.parse(localStorage.getItem('user')).id
      })

      // Get the first blog in the list
      // and like it
      cy.get('.blog-list')
        .children('.blog')
        .first()
        .get('.blog-overview')
        .get('button')
        .contains('view')
        .click()

      cy.get('.blog-details')
        .get('.blog-likes').as('blogLikes')
        .contains('0 likes')

      cy.get('@blogLikes')
        .get('.like-button')
        .contains('like')
        .click()

      cy.get('@blogLikes')
        .contains('1 likes')

      cy.get('.success.notification')
        .contains('Blog Test Blog was liked by Test User')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})
