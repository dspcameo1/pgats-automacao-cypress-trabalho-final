const seletores = {
  containerRodape: '#footer',
  tituloNewsletter: '#footer .single-widget h2',
  campoEmailInscricao: '#susbscribe_email',
  botaoEnviarInscricao: '#subscribe',
  mensagemSucessoInscricao: '#success-subscribe .alert-success',
};

function realizarInscricaoNewsletter(email) {
  cy.get(seletores.containerRodape).scrollIntoView().should('be.visible');
  cy.get(seletores.tituloNewsletter)
    .should('be.visible')
    .and('contain.text', 'Subscription');
  cy.get(seletores.campoEmailInscricao).should('be.visible').clear().type(email);
  cy.get(seletores.botaoEnviarInscricao).should('be.visible').click();
}

function validarMensagemSucessoInscricao() {
  cy.get(seletores.mensagemSucessoInscricao)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
  realizarInscricaoNewsletter,
  validarMensagemSucessoInscricao,
};
