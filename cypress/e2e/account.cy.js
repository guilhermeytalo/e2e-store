import 'cypress-mochawesome-reporter/register'
import { getUserData, mockedLoginUser } from '../support/utils/userData';

describe('Account Page', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('body').should('be.visible');
        cy.title().should('include', 'Home Page');
        cy.contains('Sign In').should('be.visible').click();
    });

    it('should navigate to account page and register a new user', () => {
        cy.intercept('POST', '**/customer/account/createPost/**').as('customerRegister');
        cy.contains('Create an Account').should('be.visible').click();
        cy.visit('/customer/account/create');
        cy.url().should('include', '/customer/account/create');
        const useApi = true;

        cy.wrap(getUserData(useApi)).then((user) => {
            cy.wait(1000);

            cy.get('input[name="firstname"]').type(user.firstName);
            cy.get('input[name="lastname"]').type(user.lastName);
            cy.get('input[name="email"]').type(user.email);
            cy.get('#password').type('#Teste123');
            cy.get('#password-confirmation').type('#Teste123');
        });

        cy.contains('button', 'Create an Account').click();
        cy.url().should('include', '/customer/account');

        cy.contains('Welcome').should('be.visible');
    });

    it('should navigate to account page and login a registered user', () => {
        cy.intercept('POST', '**/customer/account/loginPost/**').as('customerLogin');

        cy.visit('/customer/account/login');

        cy.url().should('include', '/customer/account/login');

        cy.get('input[name="login[username]"]').type(mockedLoginUser.email);
        cy.get('input[name="login[password]"]').type(mockedLoginUser.password);
        cy.contains('button', 'Sign In').click();

        cy.wait('@customerLogin').then((interception) => {
            expect(interception.response.statusCode).to.equal(302);
            console.log('Login realizado com sucesso:', interception.response);
        });

        cy.contains(`Welcome, ${mockedLoginUser.name}!`).should('be.visible');
    });

});

