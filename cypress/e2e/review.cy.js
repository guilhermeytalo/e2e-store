import 'cypress-mochawesome-reporter/register'

describe('Review Product', () => {
    it('should load the homepage go to the product and review', () => {
        cy.visit('/');
        cy.get('body').should('be.visible');
        cy.title().should('include', 'Home Page');

        cy.get('#ui-id-5').should('be.visible').and('contain', 'Men').click();
    });
});
