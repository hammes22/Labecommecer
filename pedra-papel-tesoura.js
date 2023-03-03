const PEDRA = "pedra";
const PAPEL = "papel";
const TESOURA = "tesoura";
const tipos = [
  { nome: PEDRA, forte: TESOURA, fraco: PAPEL },
  { nome: PAPEL, forte: PEDRA, fraco: TESOURA },
  { nome: TESOURA, forte: PAPEL, fraco: PEDRA },
];
const escolhaPC = geraEscolhaPc()
const escolha = process.argv[2];

function geraEscolhaPc() {
  return tipos[Math.floor(Math.random() * tipos.length)];
}

function validade() {
  switch (escolha) {
    case PEDRA:
      return true;
    case PAPEL:
      return true;
    case TESOURA:
      return true;
    default:
      false;
  }
}

function game() {
  if (escolha === escolhaPC.fraco) {
    console.log(
      `Você escolheu ${escolha} e o computador escolheu ${escolhaPC.nome}. Você ganhou!`
    );
  } else if (escolha === escolhaPC.forte) {
    console.log(
      `Você escolheu ${escolha} e o computador escolheu ${escolhaPC.nome}. Você perdeu!`
    );
  } else if (escolha === escolhaPC.nome) {
    console.log(
      `Você escolheu ${escolha} e o computador escolheu ${escolhaPC.nome}.  Empate!`
    );
  } else {
    console.log("Erro opção não encontrada");
  }
}

if (validade()) {
  game();
} else {
  console.log(`escolha entre:${PEDRA} ${PAPEL} ou ${TESOURA}`);
}
