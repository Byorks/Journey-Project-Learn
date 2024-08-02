const formatador = (data) => {
    console.log(dayjs(data).format('hh:mm'));
}

formatador(new Date('2024-04-01'));

/* Coletando Dados */
/* Object {} */
const atividade = {
    nome: "Almoço",
    /* Preciso escrever da forma correta para a função Date funcionar corretamente */
    data: new Date("2024-07-08 10:00"),
    finalizada: true
}

/* Lista/Array/Vetor */
let atividades = [
    /* o objeto atividade foi adicionado a atividades [0]*/
    atividade,
    {
        nome: 'Academia em grupo',
        data: new Date("2024-07-09 12:00"),
        finalizada: false
    },
    {
        nome: 'Gamming session',
        data: new Date("2024-07-09 16:00"),
        finalizada: true
    }
]

// Limpando lista
atividades = [];

/* Processando Dados */
/* Arrow function */
const criarItemDeAtividade = (atividade) => {

    /* Criando variável com checkbox dentro */
    let input = '<input type="checkbox" '

    /* Caso o objeto atividade esteja com o bool verdadeiro, ele adiciona a palavra ckecked */
    if (atividade.finalizada){
        /* Essa forma de escrita pode ser abreviada para += */
        input = input + 'checked'
    }
    
    /* Fecha a linha html com 'maior que' */
    input += '>'

    return `
        <div>
            ${input}
            <!-- Span coloca o elemento ao lado do outro, como se fosse na mesma linha -->
            <span>${atividade.nome}</span>
            <time>${atividade.data}</time>
        </div>
    `
}

/* Se eu quiser retirar o código do HTML, já posso, porque o JS está colocando de modo dinámico */

/* Selecionado as sections do hmtl e alterando*/
const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section');

    if(atividades.length == 0){ // Se o comprimento da lista ativivdade for 0, portanto, sem objetos!
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
        return
    }
    for(let atividade of atividades)
    {
        section.innerHTML += criarItemDeAtividade(atividade);
    }
}

// Executa o método
atualizarListaDeAtividades();