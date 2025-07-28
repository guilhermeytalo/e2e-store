import { getUserData } from '../support/utils/userData';

describe('Checkout Page', () => {
    it('should load the homepage successfully and go to checkout', () => {
        cy.intercept('GET', '**/catalogsearch/searchTermsLog/save/**').as('searchTermsLog');
        cy.intercept('GET', '**/catalogsearch/**').as('catalogSearch');
        cy.intercept('POST', '**/checkout/cart/add/**').as('addToCart');
        cy.intercept('GET', '**customer/section/load/**').as('loadedCart');
        cy.intercept('GET', '**/checkout/**').as('loadedCheckout');

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

        cy.get('#option-label-size-143-item-166').click();
        cy.get('#option-label-color-93-item-50').click();
        cy.get('button#product-addtocart-button').click();
        cy.wait('@addToCart').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            console.log('Produto adicionado ao carrinho:', interception.response);
        });
        cy.wait('@loadedCart').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            console.log('Carrinho carregado:', interception.response);
        });

        cy.wait(1000);

        cy.get('.message-success').should('be.visible').and('contain', 'You added');

        cy.get('.showcart').should('be.visible').click();

        cy.get('#top-cart-btn-checkout').should('be.visible').and('contain', 'Proceed to Checkout');
        cy.get('.secondary').should('be.visible').and('contain', 'View and Edit Cart');

        cy.get('#top-cart-btn-checkout').click();
        cy.wait('@loadedCheckout').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            console.log('Checkout carregado:', interception.response);
        });
        
        cy.get('#shipping').should('contain', 'Shipping Address');
    });
});

