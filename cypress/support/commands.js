// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import firebase from 'firebase/app';
import 'firebase/auth';
import { attachCustomCommands } from 'cypress-firebase/lib';

const firebaseConfig = {
  apiKey: Cypress.env('REACT_APP_API_KEY'),
  authDomain: Cypress.env('REACT_APP_AUTH_DOMAIN'),
  projectId: Cypress.env('REACT_APP_PROJECT_ID'),
};

firebase.initializeApp(firebaseConfig);

attachCustomCommands({ Cypress, cy, firebase });
