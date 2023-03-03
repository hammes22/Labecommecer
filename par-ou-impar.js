const PAR = "par"
const IMPAR = "impar"
const escolha = process.argv[2];
const num = Number(process.argv[3]);
const numAle = Math.floor(10 * Math.random() + 1);
const total = num + numAle;
const result = total % 2 === 0 ? PAR : IMPAR;

const pc = valorPc();

function valorPc() {
  switch (escolha) {
    case PAR:
      return IMPAR;
    case IMPAR:
      return PAR;
    default:
      break;
  }
}

function game() {
  if (escolha === result) {
    console.log(
      `Você escolheu ${escolha} e o computador escolheu ${pc}. O resultado foi ${total}. Você ganhou!`
    );
  } else if (escolha !== result) {
    console.log(
      `Você escolheu ${escolha} e o computador escolheu ${pc}. O resultado foi ${total}. Você perdeu!`
    );
  }
}

function validate() {
  switch (escolha) {
    case PAR:
      return true;
    case IMPAR:
      return true;
    default:
      return false;
  }
}

if (validate() && num) {
  game();
} else {
  console.log("escolha par ou impar e um numero valido");
}
