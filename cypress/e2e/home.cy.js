import 'cypress-mochawesome-reporter/register'

describe('Home Page', () => {
    it('should load the homepage successfully', () => {
        cy.visit('/');
        cy.get('body').should('be.visible');
        cy.title().should('include', 'Home Page');
    });
});
