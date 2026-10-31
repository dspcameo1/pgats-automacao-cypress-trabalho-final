const seletores = {
  listaProdutos: '.features_items',
  tituloSecaoProdutos: '.features_items .title',
  itensProduto: '.features_items .product-image-wrapper',
  nomesProdutosListados: '.features_items .productinfo p',
  linkDetalhesPrimeiroProduto: 'a[href="/product_details/1"]',
  containerDetalhesProduto: '.product-information',
  nomeDetalheProduto: '.product-information h2',
  precoDetalheProduto: '.product-information span span',
  campoBuscaProduto: '#search_product',
  botaoBuscarProduto: '#submit_search',
  botaoAdicionarAoCarrinho: '.features_items .productinfo .add-to-cart',
  linkVerCarrinhoModal: '.modal-content a[href="/view_cart"]',
};

function validarListaDeProdutosVisivel() {
  cy.url().should('include', '/products');
  cy.get(seletores.tituloSecaoProdutos)
    .should('be.visible')
    .and('contain.text', 'All Products');
  cy.get(seletores.listaProdutos).should('be.visible');
  cy.get(seletores.itensProduto).should('have.length.greaterThan', 0);
}

function acessarDetalhesPrimeiroProduto() {
  cy.get(seletores.linkDetalhesPrimeiroProduto).should('be.visible').click();
}

function validarDetalhesDoPrimeiroProduto() {
  cy.url().should('include', '/product_details/1');
  cy.get(seletores.containerDetalhesProduto).should('be.visible');
  cy.get(seletores.nomeDetalheProduto).should('be.visible').and('not.be.empty');
  cy.get(seletores.containerDetalhesProduto).should('contain.text', 'Category:');
  cy.get(seletores.precoDetalheProduto).should('be.visible').and('contain.text', 'Rs.');
  cy.get(seletores.containerDetalhesProduto).should('contain.text', 'Availability:');
  cy.get(seletores.containerDetalhesProduto).should('contain.text', 'Condition:');
  cy.get(seletores.containerDetalhesProduto).should('contain.text', 'Brand:');
}

function buscarProdutoPorNome(nomeProduto) {
  cy.get(seletores.campoBuscaProduto).should('be.visible').clear().type(nomeProduto);
  cy.get(seletores.botaoBuscarProduto).should('be.visible').click();
}

function validarProdutosCorrespondentesNaBusca(nomeProduto) {
  cy.get(seletores.tituloSecaoProdutos)
    .should('be.visible')
    .and('contain.text', 'Searched Products');
  cy.get(seletores.nomesProdutosListados)
    .should('be.visible')
    .and('have.length.greaterThan', 0);
  cy.get(seletores.nomesProdutosListados).each(($produto) => {
    expect($produto.text().toLowerCase()).to.include(nomeProduto.toLowerCase());
  });
}

function adicionarPrimeiroProdutoAoCarrinhoEAcessarModal() {
  cy.get(seletores.botaoAdicionarAoCarrinho).first().should('be.visible').click();
  cy.get(seletores.linkVerCarrinhoModal).should('be.visible').click();
}

module.exports = {
  validarListaDeProdutosVisivel,
  acessarDetalhesPrimeiroProduto,
  validarDetalhesDoPrimeiroProduto,
  buscarProdutoPorNome,
  validarProdutosCorrespondentesNaBusca,
  adicionarPrimeiroProdutoAoCarrinhoEAcessarModal,
};
