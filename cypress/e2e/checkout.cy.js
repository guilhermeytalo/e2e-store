import { getUserData } from '../support/utils/userData';
import 'cypress-mochawesome-reporter/register'

describe('Checkout Page', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/catalogsearch/searchTermsLog/save/**').as('searchTermsLog');
        cy.intercept('GET', '**/catalogsearch/**').as('catalogSearch');
        cy.intercept('POST', '**/checkout/cart/add/**').as('addToCart');
        cy.intercept('GET', '**customer/section/load/**').as('loadedCart');
        cy.intercept('GET', '**/checkout/**').as('checkoutRequests');
        cy.intercept('POST', '**/checkout/**').as('checkoutPost');
        cy.intercept('GET', '**/totals-information/**').as('totalsInformation');
        cy.intercept('GET', '**/payment-information/**').as('paymentInformation');
        cy.intercept('GET', '**/shipping-information/address-renderer/**').as('shippingAddressRenderer');

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
        cy.url().should('include', '/checkout');
        cy.get('#shipping', { timeout: 10000 }).should('be.visible');
    });

    it('should display checkout page with shipping section', () => {
        cy.url().should('include', '/checkout/#shipping');
        cy.get('#shipping').should('contain', 'Shipping Address');
    });


    it('should fill out the shipping form and proceed to payment', () => {
        const useApi = true;

        cy.wrap(getUserData(useApi)).then((user) => {
            cy.wait(1000);

            cy.get('#customer-email').should('have.length', 1).type(user.email);
            cy.get('input[name="firstname"]').type(user.firstName);
            cy.get('input[name="lastname"]').type(user.lastName);

            cy.get('input[name="street[0]"]').type(user.street[0]);
            if (user.street[1]) cy.get('input[name="street[1]"]').type(user.street[1]);
            if (user.street[2]) cy.get('input[name="street[2]"]').type(user.street[2]);

            cy.get('input[name="city"]').type(user.city);
            cy.get('select[name="region_id"]').select(user.state);
            cy.get('input[name="postcode"]').type(user.zip);
            cy.get('select[name="country_id"]').select(user.country);
            cy.get('input[name="telephone"]').type(user.phone);

            cy.get('input[name="ko_unique_1"]').check();
            cy.get('input[name="ko_unique_2"]').check();
            cy.contains('button', 'Next').click();


            cy.url().should('include', 'checkout/#payment');

            cy.get('.payment-group > .step-title', { timeout: 10000 }).should('contain', 'Payment Method');

            cy.wait('@shippingAddressRenderer').then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                console.log('Shipping address renderer loaded:', interception.response);
            });

            cy.contains('button', 'Place Order').click();
        });
    });
});

