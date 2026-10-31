const seletores = {
  formularioSignup: '.signup-form',
  campoNomeInicial: '[data-qa="signup-name"]',
  campoEmailInicial: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',
  mensagemErroSignup: '.signup-form p',
  radioGeneroMasculino: '#id_gender1',
  campoSenha: '[data-qa="password"]',
  selectDia: '[data-qa="days"]',
  selectMes: '[data-qa="months"]',
  selectAno: '[data-qa="years"]',
  checkboxNewsletter: '#newsletter',
  checkboxOfertas: '#optin',
  campoPrimeiroNome: '[data-qa="first_name"]',
  campoSobrenome: '[data-qa="last_name"]',
  campoEmpresa: '[data-qa="company"]',
  campoEndereco: '[data-qa="address"]',
  campoEndereco2: '[data-qa="address2"]',
  selectPais: '[data-qa="country"]',
  campoEstado: '[data-qa="state"]',
  campoCidade: '[data-qa="city"]',
  campoCep: '[data-qa="zipcode"]',
  campoCelular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  tituloContaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]',
};

function iniciarCadastro(nome, email) {
  cy.get(seletores.formularioSignup)
    .should('be.visible')
    .and('contain.text', 'New User Signup!');
  cy.get(seletores.campoNomeInicial).clear().type(nome);
  cy.get(seletores.campoEmailInicial).clear().type(email);
  cy.get(seletores.botaoSignup).click();
}

function preencherFormularioCompleto(dados) {
  cy.get(seletores.campoSenha).should('be.visible').type(dados.senha);
  cy.get(seletores.radioGeneroMasculino).check();
  cy.get(seletores.selectDia).select(dados.diaNascimento);
  cy.get(seletores.selectMes).select(dados.mesNascimento);
  cy.get(seletores.selectAno).select(dados.anoNascimento);
  cy.get(seletores.checkboxNewsletter).check();
  cy.get(seletores.checkboxOfertas).check();
  cy.get(seletores.campoPrimeiroNome).type(dados.primeiroNome);
  cy.get(seletores.campoSobrenome).type(dados.sobrenome);
  cy.get(seletores.campoEmpresa).type(dados.empresa);
  cy.get(seletores.campoEndereco).type(dados.endereco);
  cy.get(seletores.campoEndereco2).type(dados.endereco2);
  cy.get(seletores.selectPais).select(dados.pais);
  cy.get(seletores.campoEstado).type(dados.estado);
  cy.get(seletores.campoCidade).type(dados.cidade);
  cy.get(seletores.campoCep).type(dados.cep);
  cy.get(seletores.campoCelular).type(dados.celular);
  cy.get(seletores.botaoCriarConta).click();
}

function validarContaCriadaEContinuar() {
  cy.get(seletores.tituloContaCriada)
    .should('be.visible')
    .and('contain.text', 'Account Created!');
  cy.get(seletores.botaoContinuar).should('be.visible').click();
}

function cadastrarUsuarioCompleto(dados) {
  iniciarCadastro(dados.nome, dados.email);
  preencherFormularioCompleto(dados);
  validarContaCriadaEContinuar();
}

function validarErroEmailExistente() {
  cy.get(seletores.mensagemErroSignup)
    .should('be.visible')
    .and('contain.text', 'Email Address already exist!');
}

module.exports = {
  iniciarCadastro,
  preencherFormularioCompleto,
  validarContaCriadaEContinuar,
  cadastrarUsuarioCompleto,
  validarErroEmailExistente,
};
