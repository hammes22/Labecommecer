export function sumByPropName(nameProp:string, sumProp:string, arr:any) {
  const map = new Map();

  for (const obj of arr) {
    // Chave que utilizaremos para o mapa. A `key` corresponde a cada "nome" único.
    const key = obj[nameProp];

    // Caso nenhum objeto já tiver sido registrado para a chave atual, devemos o
    // inserir pela primeira vez.
    if (!map.has(key)) {
      map.set(key, obj);

      // Podemos pular para a próxima iteração, já que o valor correspondente
      // já está incluído no `obj`.
      continue;
    }

    // Caos já tenha sido registrado, é só somar ao valor já armazenado.
    map.get(key)[sumProp] += obj[sumProp];
  }

  // Converter o mapa em array:
  return [...map.values()];
}