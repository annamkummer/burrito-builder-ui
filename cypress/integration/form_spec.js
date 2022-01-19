describe('Form user flow', () => {

    beforeEach(() => {
        cy.visit('localhost:3000')
    })

    it('User should be able to input text in the Name field.', () => {
        cy.get('.name-field').type('ABCD')
        cy.get('.name-field').should('have.value', 'ABCD')
    })

    it('User should be able to select ingredients, and see them appear below the buttons.', () => {
        cy.get('button').first().click()
        cy.get('form').contains('beans')
    })

    it('If either name or ingredients is missing, user should not be able to click the Submit button.', () => {
        cy.get('.submit-btn').should('be.disabled')
    })

    it('When user has input name and added at least one ingredient, they should be able to click the Submit button.', () => {
        cy.get('.name-field').type('ABCD')
        cy.get('button').first().click()
        cy.get('.submit-btn').click()
    })

    it('After clicking Submit, if the order posted correctly, they should see their order appear in the orders section.', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
            statusCode: 200,
            ok: true,
            body: {
                name: "Ok"
            }
        })
        cy.get('.name-field').type('ABCD')
        cy.get('button').first().click()
        cy.get('.submit-btn').click()
        cy.get('.order').contains('ABCD')
    })

    it('If the order did not post correctly, they should see an error message.', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
            statusCode: 500,
            ok: false,
            body: {
                name: " Not ok"
            }
        })
        cy.get('.name-field').type('ABCD')
        cy.get('button').first().click()
        cy.get('.submit-btn').click()
        cy.get('.orders-section').contains('Oops!')
    })

})