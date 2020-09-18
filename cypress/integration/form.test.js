
describe('Pizza Order Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001')
    })

    //selectors
    const getTextBox = () => {return cy.get('#special-instructions')}
    const getOrderLink = () => {return cy.get('[href="/pizza"]')}
    const getPepperoni = () => {return cy.get('#pepperoni-input')}
    const getSausage = () => {return cy.get('#sausage-input')}
    const getMushrooms = () => {return cy.get('#mushrooms-input')}
    const getOlives = () => { return cy.get('#olives-input') }
    const getSubmit = () => { return cy.get('#submit-button')}

   //Input 
    it('can type in input box', () => {
        getOrderLink()
            .click()
        getTextBox()
            .should('have.value', '')//starts empty
            .type('testtest')
            .should('have.value', 'testtest')
            .clear()
    })

   //checkbox
   it('can select multiple toppings', () => {
        getOrderLink()
            .click()
        getPepperoni()
            .should('not.be.checked')
            .check()
            .should('be.checked')
        getSausage()
            .should('not.be.checked')
            .check()
            .should('be.checked')
        getMushrooms()
            .should('not.be.checked')
            .check()
            .should('be.checked')
        getOlives()
            .should('not.be.checked')
            .check()
            .should('be.checked')
   })

   //Submit button test
    it('can submit form', () => {
        getOrderLink()
            .click()
        getSubmit()
            .should('be.disabled')
        cy.get('#name-input')
            .type('test')
        getSubmit()
            .should('be.disabled')
        cy.get('select')
            .select('Small')
        getSubmit()
            .should('be.disabled')
        getMushrooms()
            .check()
        getSubmit()
            .should('not.be.disabled')
        cy.get('#special-instructions')
            .type('none')
        getSubmit()
            .should('not.be.disabled')
            .click()
    })
})
