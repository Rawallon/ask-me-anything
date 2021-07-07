it('Should show sign in modal', () => {
  cy.logout();
  cy.visit('http://localhost:3000/');
  cy.wait(3000);
  cy.contains('Sign In').click();
  cy.wait(100);
  cy.contains('Continuar com o Google');
  cy.get('.modal button').first().click();
  cy.wait(100);
  cy.get('input').first().click();
  cy.wait(100);
  cy.contains('Continuar com o Google');
});

it('Should show user name on header', () => {
  cy.logout();
  cy.visit('http://localhost:3000/');
  cy.login();
  cy.wait(500);
  cy.contains('Rawallon Cardoso');
});

it('Should logout', () => {
  cy.logout();
  cy.visit('http://localhost:3000/');
  cy.login();
  cy.wait(500);
  cy.contains('Rawallon Cardoso').first().click();
  cy.contains('Logout').click();
  cy.wait(500);
  cy.contains('Sign In');
});
