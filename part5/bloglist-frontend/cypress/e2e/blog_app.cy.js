describe('Login form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Login form is shown', () => {
    cy.contains('username').should('be.visible')
    cy.contains('password').should('be.visible')
    cy.contains('login').should('be.visible')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('userTest')
      cy.get('#password').type('123')
      cy.get('#login-button').click()
    })



    it('A blog can be liked', function() {
      cy.contains('view').click()

      cy.get('#like-count').then(($likeSpan) => {
        const initialLikes = parseInt($likeSpan.text())
        cy.get('#like-button').click()
        cy.get('#like-count').should('contain', initialLikes + 1)
      })
    })

    it('The remove button is not shown to the not owner', function() {
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })

    it('A blog can be created', function() {
      cy.contains('add blog').click()
      cy.get("#title").should('be.visible').type("blogtest")
      cy.get("#url").should('be.visible').type("blogtest")
      cy.get("#author").should('be.visible').type('blogtest')
      cy.get("#cancel-button").should('be.visible')
      cy.get("#create-button").should('be.visible').click()
    })

    it('A blog can be deleted', function() {
      cy.get('#blog-blogtest').within(() => {
        cy.contains('view').click()
        cy.contains('remove').click()
      })

      cy.get("blog-blogtest").should('not.exist')
    })

  })


  describe('Blogs are ordered by likes and cleaned after', function() {
    beforeEach(function() {
      cy.get('#username').type('userTest')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      const blogs = [
        { title: 'BlogA', author: 'AuthorA', url: 'a.com' },
        { title: 'BlogB', author: 'AuthorB', url: 'b.com' },
        { title: 'BlogC', author: 'AuthorC', url: 'c.com' },
      ]

      blogs.forEach(blog => {
        cy.contains('add blog').click()
        cy.get('#title').type(blog.title)
        cy.get('#author').type(blog.author)
        cy.get('#url').type(blog.url)
        cy.get('#create-button').click()
      })
    })

    it('Blogs are ordered by likes descending', function() {
      cy.get('#blog-BlogA').within(() => {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('like').click().wait(100)
        cy.contains('like').click().wait(100)
        cy.contains('hide').click()

      })
      cy.get('#blog-BlogB').within( () => {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('like').click().wait(100)
        cy.contains('hide').click()
      })

      cy.get('.blog').then(blogs => {
        const titles = [...blogs].map(el => el.innerText)
        expect(titles[0]).to.contain('BlogA')
        expect(titles[1]).to.contain('BlogB')
        expect(titles[2]).to.contain('BlogC')
      })

      cy.get('.blog').each($el => {
        if ($el.text().includes('remove')) {
          cy.wrap($el).contains('view').click()
          cy.wrap($el).contains('remove').click()
        }
      })

    })
  })
})

