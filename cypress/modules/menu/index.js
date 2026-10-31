const seletores = {
  logoHome: '#header .logo img',
  menuNavegacao: '.shop-menu',
  linkLoginCadastro: '.shop-menu a[href="/login"]',
  linkLogout: '.shop-menu a[href="/logout"]',
  linkDeletarConta: '.shop-menu a[href="/delete_account"]',
  linkProdutos: '.shop-menu a[href="/products"]',
  linkCarrinho: '.shop-menu a[href="/view_cart"]',
  tituloContaDeletada: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]',
};

function acessarPaginaInicial() {
  cy.visit('/');
  cy.get(seletores.logoHome).should('be.visible');
  cy.get(seletores.menuNavegacao).should('be.visible');
}

function navegarParaLogin() {
  cy.get(seletores.linkLoginCadastro).should('be.visible').click();
}

function navegarParaProdutos() {
  cy.get(seletores.linkProdutos).should('be.visible').click();
}

function navegarParaCarrinho() {
  cy.get(seletores.linkCarrinho).should('be.visible').click();
}

function efetuarLogout() {
  cy.get(seletores.linkLogout).should('be.visible').click();
}

function excluirConta() {
  cy.get(seletores.linkDeletarConta).should('be.visible').click();
}

function validarUsuarioLogado(nomeUsuario) {
  cy.get(seletores.menuNavegacao)
    .should('be.visible')
    .and('contain.text', `Logged in as ${nomeUsuario}`);
}

function validarContaExcluidaEContinuar() {
  cy.get(seletores.tituloContaDeletada)
    .should('be.visible')
    .and('contain.text', 'Account Deleted!');
  cy.get(seletores.botaoContinuar).should('be.visible').click();
}

module.exports = {
  acessarPaginaInicial,
  navegarParaLogin,
  navegarParaProdutos,
  navegarParaCarrinho,
  efetuarLogout,
  excluirConta,
  validarUsuarioLogado,
  validarContaExcluidaEContinuar,
};
