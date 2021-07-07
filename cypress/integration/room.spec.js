it('Should fill the form to create a room and go to its page', () => {
  cy.logout();
  cy.visit('http://localhost:3000/');
  cy.login();
  cy.wait(1000);
  cy.get('input.post-info').first().type('Title');
  cy.get('.ql-editor').first().type('Description');
  cy.contains('Postar').click();
  cy.wait(1000);
  cy.contains('Title');
  cy.contains('Description');
});

it('Should post a comment', () => {
  cy.logout();
  cy.login('CK2FxXKfxRYHdEERpzihut2sf5n1');
  cy.reload();
  cy.wait(1000);
  cy.get('.ql-editor').last().type('Commenting!');
  cy.contains('Enviar pergunta').click();
  cy.wait(1000);
  cy.contains('Commenting!');
});

it('Should like the posted comment', () => {
  cy.get('.like-button').click();
  cy.get('.like-button > span').contains('1');
});

it('Should unlike the posted comment', () => {
  cy.get('.like-button').click();
  cy.get('.like-button > span').should('not.exist');
});

it('Should delete the posted comment', () => {
  cy.get(`[aria-label="Deletar a pergunta"]`).click();
  cy.get('button.confirm').click();
  cy.wait(1000);
  cy.contains('[removido pelo usuário]');
});

it('Should fill the form to create a room and go to its page', () => {
  cy.logout();
  cy.login();
  cy.wait(1000);
  cy.contains('Rawallon Cardoso').click();
  cy.get('.dropdown button').first().click();
  cy.wait(1000);
  cy.contains('Essa sala foi encerrada');
});
