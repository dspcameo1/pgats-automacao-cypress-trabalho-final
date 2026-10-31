const seletores = {
  informacoesCheckout: '[data-qa="checkout-info"]',
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  revisaoItensPedido: '#cart_info',
  campoMensagemPedido: 'textarea[name="message"]',
  botaoFazerPedido: 'a[href="/payment"]',
  campoNomeNoCartao: '[data-qa="name-on-card"]',
  campoNumeroCartao: '[data-qa="card-number"]',
  campoCvc: '[data-qa="cvc"]',
  campoMesExpiracao: '[data-qa="expiry-month"]',
  campoAnoExpiracao: '[data-qa="expiry-year"]',
  botaoPagarEConfirmar: '[data-qa="pay-button"]',
  tituloPedidoConfirmado: '[data-qa="order-placed"]',
};

function validarDetalhesEnderecoERevisaoPedido(dadosUsuario) {
  cy.url().should('include', '/checkout');
  cy.get(seletores.informacoesCheckout).should('be.visible');
  cy.get(seletores.enderecoEntrega)
    .should('be.visible')
    .and('contain.text', dadosUsuario.primeiroNome)
    .and('contain.text', dadosUsuario.endereco);
  cy.get(seletores.enderecoCobranca)
    .should('be.visible')
    .and('contain.text', dadosUsuario.primeiroNome);
  cy.get(seletores.revisaoItensPedido).should('be.visible');
}

function informarComentarioEAvancarParaPagamento(comentario) {
  cy.get(seletores.campoMensagemPedido).should('be.visible').clear().type(comentario);
  cy.get(seletores.botaoFazerPedido).should('be.visible').click();
}

function preencherDadosPagamentoEConfirmar(dadosCartao) {
  cy.url().should('include', '/payment');
  cy.get(seletores.campoNomeNoCartao).should('be.visible').type(dadosCartao.nomeTitular);
  cy.get(seletores.campoNumeroCartao).type(dadosCartao.numero);
  cy.get(seletores.campoCvc).type(dadosCartao.cvc);
  cy.get(seletores.campoMesExpiracao).type(dadosCartao.mesExpiracao);
  cy.get(seletores.campoAnoExpiracao).type(dadosCartao.anoExpiracao);
  cy.get(seletores.botaoPagarEConfirmar).click();
}

function validarPedidoConfirmadoComSucesso() {
  cy.get(seletores.tituloPedidoConfirmado)
    .should('be.visible')
    .and('contain.text', 'Order Placed!');
}

module.exports = {
  validarDetalhesEnderecoERevisaoPedido,
  informarComentarioEAvancarParaPagamento,
  preencherDadosPagamentoEConfirmar,
  validarPedidoConfirmadoComSucesso,
};
