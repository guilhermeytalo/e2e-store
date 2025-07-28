import 'cypress-mochawesome-reporter/register'

describe('Search Page', () => {
    it('should load the homepage successfully search the propduct and click on it', () => {
        cy.intercept('GET', '**/catalogsearch/searchTermsLog/save/**').as('searchTermsLog');
        cy.intercept('GET', '**/catalogsearch/**').as('catalogSearch');

        cy.visit('/');
        cy.get('body').should('be.visible');
        cy.title().should('include', 'Home Page');

        cy.get('#search').type('shirt{enter}');
        cy.wait('@searchTermsLog').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            console.log('SearchTermsLog completado:', interception.response);
        });

        cy.get('.products').should('be.visible');
        cy.get('.products > :nth-child(5)').should('be.visible').click();
    });
});
