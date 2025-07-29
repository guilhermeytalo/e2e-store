import 'cypress-mochawesome-reporter/register'
import { getUserData } from '../support/utils/userData';

describe('Review Product', () => {
    const reviews = [
        'Excelente qualidade!',
        'Muito bom pelo preço.',
        'Poderia ser melhor.',
        'Gostei bastante, compraria de novo.',
        'Não atendeu minhas expectativas.'
    ]

    const randomReview = reviews[Math.floor(Math.random() * reviews.length)]


    it('should load the homepage go to the product and review', () => {
        cy.intercept('POST', '**/review/product/post/id/**').as('submitReview');

        cy.visit('/');
        cy.get('body').should('be.visible');
        cy.title().should('include', 'Home Page');

        cy.get('#ui-id-5').should('be.visible').and('contain', 'Men').click();

        cy.get('.products-grid').then($items => {
            const randomIndex = Math.floor(Math.random() * $items.length)
            cy.wrap($items[randomIndex]).click()
        });

        cy.get('#tab-label-reviews-title').should('be.visible').and('contain', 'Reviews').click();

        cy.wrap(getUserData()).then((user) => {
            cy.get('label.rating-3').click({ force: true });
            cy.get('input[name="nickname"]').type(`${user.firstName} ${user.lastName}`);
            cy.get('input[name="title"]').type(randomReview);
            cy.get('textarea[name="detail"]').type('Este é um review de produto!');
            cy.contains('button', 'Submit Review').click();
        });

        cy.wait('@submitReview').then((interception) => {
            expect(interception.response.statusCode).to.equal(302);
            console.log('Review submitted:', interception.response);
        });

        cy.contains('You submitted').should('be.visible');
    });
});
