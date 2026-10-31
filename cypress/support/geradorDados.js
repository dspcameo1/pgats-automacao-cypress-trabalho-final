function gerarEmailDinamico(prefixo = 'usuario') {
  const timestamp = Date.now();
  const aleatorio = Math.floor(Math.random() * 10000);
  return `${prefixo}_${timestamp}_${aleatorio}@teste.com`;
}

function criarDadosUsuario() {
  const sufixo = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  return {
    nome: `Usuario PGATS ${sufixo}`,
    email: gerarEmailDinamico('usuario'),
    senha: `Senha@${Math.floor(100000 + Math.random() * 900000)}`,
    diaNascimento: '15',
    mesNascimento: 'May',
    anoNascimento: '1995',
    primeiroNome: 'Joao',
    sobrenome: 'Silva',
    empresa: 'PGATS QA Engenharia',
    endereco: '123 Maple Street',
    endereco2: 'Suite 400',
    pais: 'Canada',
    estado: 'Ontario',
    cidade: 'Toronto',
    cep: 'M5H2N2',
    celular: '14165550199',
  };
}

function criarDadosCartao() {
  return {
    nomeTitular: 'JOAO SILVA',
    numero: '4111111111111111',
    cvc: '321',
    mesExpiracao: '12',
    anoExpiracao: '2030',
  };
}

module.exports = {
  gerarEmailDinamico,
  criarDadosUsuario,
  criarDadosCartao,
};
