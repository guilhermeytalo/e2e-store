import 'cypress-mochawesome-reporter/register';

describe('Cart Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('body').should('be.visible');
    cy.title().should('include', 'Home Page');

    cy.intercept('POST', '**/checkout/cart/add/**').as('addToCart');
    cy.intercept('GET', '**/customer/section/load/**').as('loadedCart');
  });

  it('should search for a product and add to cart', () => {
    cy.intercept('GET', '**/catalogsearch/searchTermsLog/save/**').as('searchTermsLog');
    cy.intercept('GET', '**/catalogsearch/**').as('catalogSearch');

    cy.get('#search').type('shirt{enter}');
    cy.wait('@searchTermsLog').its('response.statusCode').should('eq', 200);

    cy.get('.products').should('be.visible');
    cy.get('.products > :nth-child(5)').click();

    cy.get('[aria-labelledby*="option-label-size"] .swatch-option').first().click();

    cy.get('[aria-labelledby*="option-label-color"] .swatch-option').first().click();

    cy.get('button#product-addtocart-button').click();

    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
    cy.wait('@loadedCart').its('response.statusCode').should('eq', 200);

    cy.contains('You added').should('be.visible');
  });

  it('should add a random product from Men section to cart', () => {
    cy.get('#ui-id-5').should('contain', 'Men').click();

    cy.get('.products-grid')
      .find('.product-item')
      .then($items => {
        const randomIndex = Math.floor(Math.random() * $items.length);
        cy.wrap($items[randomIndex]).click();
      });

    cy.get('[aria-labelledby*="option-label-size"] .swatch-option').should('be.visible');
    cy.get('[aria-labelledby*="option-label-color"] .swatch-option').should('be.visible');

    cy.get('[aria-labelledby*="option-label-size"] .swatch-option').first().click();

    cy.get('[aria-labelledby*="option-label-color"] .swatch-option').first().click();

    cy.get('button#product-addtocart-button').click();

    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
    cy.wait('@loadedCart').its('response.statusCode').should('eq', 200);
    cy.wait(3000);
    cy.contains('You added').should('be.visible');
  });
});
