const seletores = {
  tabelaCarrinho: '#cart_info_table',
  linhasItensCarrinho: '#cart_info_table tbody tr',
  botaoProsseguirCheckout: '.check_out',
};

function validarCarrinhoExibidoComProdutos() {
  cy.url().should('include', '/view_cart');
  cy.get(seletores.tabelaCarrinho).should('be.visible');
  cy.get(seletores.linhasItensCarrinho).should('have.length.greaterThan', 0);
}

function prosseguirParaCheckout() {
  cy.get(seletores.botaoProsseguirCheckout).should('be.visible').click();
}

module.exports = {
  validarCarrinhoExibidoComProdutos,
  prosseguirParaCheckout,
};
