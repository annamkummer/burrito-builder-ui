describe('App user flow', () => {

    it('When a user visits the page, they should see a title and form.', () => {
        cy.visit('localhost:3000')
        cy.get('h1').contains('Burrito Builder')
        cy.get('form')
    })
    
    it('When a user visits the page, they should see previous orders.', () => {
        const orders = {orders: [
            {
                id: 1,
                name: "Pat",
                ingredients: [
                    "beans",
                    "lettuce",
                    "carnitas",
                    "queso fresco",
                    "jalapeno"
                ]
            },{
                id: 2,
                name: "Sam",
                ingredients: [
                    "steak",
                    "pico de gallo",
                    "lettuce",
                    "carnitas",
                    "queso fresco",
                    "jalapeno"
                ]
            }
        ]}
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            ok: true,
            body: orders
        })
        cy.visit('localhost:3000')
        cy.get('.order').should('have.length', 2)
        cy.get('.order').first().contains('Pat')
    })

    it('If there are no previous orders, the user should see a "No orders yet!" message', () => {
        const orders = {orders: []}
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            ok: true,
            body: orders
        })
        cy.visit('localhost:3000')
        cy.get('.orders-section').contains('No orders yet!')
    })

    it('If there is a fetch error, the user should see an error message.', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            ok: false,
            message: "Failed to fetch", 
            body: "Error"
        })
        cy.visit('localhost:3000')
        cy.get('.orders-section').contains('Oops!')
    })

})