/// <reference types="cypress" />

const faker = require('faker');

describe('TGL', () => {
  const credentials = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Should create a new user', () => {
    cy.get('[href="/register"]').click();

    cy.get('#name').type(credentials.name);
    cy.get('#email').type(credentials.email);
    cy.get('#password').type(credentials.password);

    cy.get('button').click();
    cy.location('href').should('not.contain', '/register');
  });

  it('Should logout', () => {
    cy.get('ul > :nth-child(2) > button').click();
    cy.location('href').should('contain', '/authentication');
  });

  it('Should login', () => {
    cy.get('#email').type(credentials.email);
    cy.get('#password').type(credentials.password);

    cy.get('button').click();
    cy.location('href').should('not.contain', '/authentication');
  });

  it('Should create new bets', () => {
    cy.get('header > a').click();

    cy.contains('button', 'Mega-Sena').click();

    for (let i = 0; i < 7; i++) {
      cy.get('.actions > :nth-child(1)').click();
      cy.get('.hVxykY').click();
    }

    cy.get(':nth-child(4) > button').click();

    cy.location('href').should('not.contain', '/new-bet');
    cy.get('section > ul > li').should('have.length', '7');
  });
});
