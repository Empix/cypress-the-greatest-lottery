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
});
