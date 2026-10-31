const seletores = {
  formularioLogin: '.login-form',
  campoEmailLogin: '[data-qa="login-email"]',
  campoSenhaLogin: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  mensagemErroLogin: '.login-form p',
};

function realizarLogin(email, senha) {
  cy.get(seletores.formularioLogin)
    .should('be.visible')
    .and('contain.text', 'Login to your account');
  cy.get(seletores.campoEmailLogin).clear().type(email);
  cy.get(seletores.campoSenhaLogin).clear().type(senha);
  cy.get(seletores.botaoLogin).click();
}

function validarErroCredenciaisInvalidas() {
  cy.get(seletores.mensagemErroLogin)
    .should('be.visible')
    .and('contain.text', 'Your email or password is incorrect!');
}

function validarRedirecionamentoPaginaLogin() {
  cy.url().should('include', '/login');
  cy.get(seletores.formularioLogin)
    .should('be.visible')
    .and('contain.text', 'Login to your account');
  cy.get(seletores.botaoLogin).should('be.visible');
}

module.exports = {
  realizarLogin,
  validarErroCredenciaisInvalidas,
  validarRedirecionamentoPaginaLogin,
};
