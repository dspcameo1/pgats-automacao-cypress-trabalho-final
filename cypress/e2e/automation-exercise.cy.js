const menu = require('../modules/menu');
const cadastro = require('../modules/cadastro');
const login = require('../modules/login');
const produtos = require('../modules/produtos');
const carrinho = require('../modules/carrinho');
const checkout = require('../modules/checkout');
const rodape = require('../modules/rodape');
const {
  gerarEmailDinamico,
  criarDadosUsuario,
  criarDadosCartao,
} = require('../support/geradorDados');

describe('Automation Exercise - Casos de Teste E2E (Trabalho Final PGATS)', () => {
  beforeEach(() => {
    menu.acessarPaginaInicial();
  });

  it('Caso 1 - Deve cadastrar um novo usuário completo, confirmar autenticação e excluir a conta com sucesso', () => {
    const usuario = criarDadosUsuario();

    menu.navegarParaLogin();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.preencherFormularioCompleto(usuario);
    cadastro.validarContaCriadaEContinuar();
    menu.validarUsuarioLogado(usuario.nome);
    menu.excluirConta();
    menu.validarContaExcluidaEContinuar();
  });

  it('Caso 5 - Deve impedir o cadastro com um endereço de e-mail já registrado e exibir mensagem de erro', () => {
    const usuario = criarDadosUsuario();

    menu.navegarParaLogin();
    cadastro.cadastrarUsuarioCompleto(usuario);
    menu.validarUsuarioLogado(usuario.nome);
    menu.efetuarLogout();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.validarErroEmailExistente();
  });

  it('Caso 3 - Deve impedir o login com e-mail e senha incorretos e exibir mensagem de credenciais inválidas', () => {
    const emailIncorreto = gerarEmailDinamico('invalido');
    const senhaIncorreta = 'SenhaErrada999!';

    menu.navegarParaLogin();
    login.realizarLogin(emailIncorreto, senhaIncorreta);
    login.validarErroCredenciaisInvalidas();
  });

  it('Caso 2 - Deve realizar login com e-mail e senha válidos, confirmar usuário logado e apagar a conta ao final', () => {
    const usuario = criarDadosUsuario();

    menu.navegarParaLogin();
    cadastro.cadastrarUsuarioCompleto(usuario);
    menu.validarUsuarioLogado(usuario.nome);
    menu.efetuarLogout();
    login.realizarLogin(usuario.email, usuario.senha);
    menu.validarUsuarioLogado(usuario.nome);
    menu.excluirConta();
    menu.validarContaExcluidaEContinuar();
  });

  it('Caso 4 - Deve realizar logout de um usuário autenticado e redirecionar para a página de login', () => {
    const usuario = criarDadosUsuario();

    menu.navegarParaLogin();
    cadastro.cadastrarUsuarioCompleto(usuario);
    menu.validarUsuarioLogado(usuario.nome);
    menu.efetuarLogout();
    login.validarRedirecionamentoPaginaLogin();
  });

  it('Caso 8 - Deve listar todos os produtos e exibir nome, categoria, preço, disponibilidade, condição e marca nos detalhes do primeiro produto', () => {
    menu.navegarParaProdutos();
    produtos.validarListaDeProdutosVisivel();
    produtos.acessarDetalhesPrimeiroProduto();
    produtos.validarDetalhesDoPrimeiroProduto();
  });

  it('Caso 9 - Deve buscar um produto pelo nome na barra de pesquisa e exibir os produtos correspondentes', () => {
    const termoPesquisa = 'Blue Top';

    menu.navegarParaProdutos();
    produtos.validarListaDeProdutosVisivel();
    produtos.buscarProdutoPorNome(termoPesquisa);
    produtos.validarProdutosCorrespondentesNaBusca(termoPesquisa);
  });

  it('Caso 10 - Deve realizar a inscrição de e-mail na newsletter do rodapé e validar a mensagem de confirmação', () => {
    const emailNewsletter = gerarEmailDinamico('newsletter');

    rodape.realizarInscricaoNewsletter(emailNewsletter);
    rodape.validarMensagemSucessoInscricao();
  });

  it('Caso 15 - Deve finalizar um pedido cadastrando uma nova conta antes do checkout, confirmar pagamento e excluir a conta', () => {
    const usuario = criarDadosUsuario();
    const cartao = criarDadosCartao();

    menu.navegarParaLogin();
    cadastro.cadastrarUsuarioCompleto(usuario);
    menu.validarUsuarioLogado(usuario.nome);
    menu.navegarParaProdutos();
    produtos.adicionarPrimeiroProdutoAoCarrinhoEAcessarModal();
    carrinho.validarCarrinhoExibidoComProdutos();
    carrinho.prosseguirParaCheckout();
    checkout.validarDetalhesEnderecoERevisaoPedido(usuario);
    checkout.informarComentarioEAvancarParaPagamento('Pedido automatizado Caso 15 - PGATS');
    checkout.preencherDadosPagamentoEConfirmar(cartao);
    checkout.validarPedidoConfirmadoComSucesso();
    menu.excluirConta();
    menu.validarContaExcluidaEContinuar();
  });

  it('Caso 16 - Deve finalizar um pedido realizando login antes do checkout, confirmar pagamento e excluir a conta', () => {
    const usuario = criarDadosUsuario();
    const cartao = criarDadosCartao();

    menu.navegarParaLogin();
    cadastro.cadastrarUsuarioCompleto(usuario);
    menu.validarUsuarioLogado(usuario.nome);
    menu.efetuarLogout();
    login.realizarLogin(usuario.email, usuario.senha);
    menu.validarUsuarioLogado(usuario.nome);
    menu.navegarParaProdutos();
    produtos.adicionarPrimeiroProdutoAoCarrinhoEAcessarModal();
    carrinho.validarCarrinhoExibidoComProdutos();
    carrinho.prosseguirParaCheckout();
    checkout.validarDetalhesEnderecoERevisaoPedido(usuario);
    checkout.informarComentarioEAvancarParaPagamento('Pedido automatizado Caso 16 - PGATS');
    checkout.preencherDadosPagamentoEConfirmar(cartao);
    checkout.validarPedidoConfirmadoComSucesso();
    menu.excluirConta();
    menu.validarContaExcluidaEContinuar();
  });
});
