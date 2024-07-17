//Depois ver como remove do pnpm o dayjs
// Bibliotecas e códigos de terceiros
const formatador = (data:Date) => {
    //Depois de colocado as dependencias no HTML 
    //estou adicionando as datas em objetos, para ficar organizado
    return{
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm') 
    }
}

formatador(new Date('2024-04-01'))
// Objeto
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
}

// Lista
let atividades = [
    atividade,
    {
        nome: "Academia em grupo",
        data: new Date ("2024-07-09 12:00"),
        finalizada: false
    },
    {
        nome: "Gamming session",
        data: new Date ("2024-07-09 16:00"),
        finalizada: true
    }
]

// atividades = [];

// Arrow Function
const CriarItemDeAtividade = (atividade : {nome:string, data:Date,finalizada: boolean}) => {
    let input = '<input type="checkbox" ';

    if(atividade.finalizada) {
        input += 'checked';
    }

    input += '>';
    	
    // Retorna objeto
    const formatar = formatador(atividade.data);

    return `
     <div>
           ${input}
            <span>${atividade.nome}</span>
            <time>
            ${formatar.dia.semana.longo}, 
            dia ${formatar.dia.numerico}
            de ${formatar.mes}
            às ${formatar.hora}h
            </time>
        </div>
    `
}

// Dom

const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section');

    // Verificar se a minha lista está vazia
    if(atividades.length == 0) {
        section!.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
        return 
        // Com esse return paramos o código aqui.
    }

    // Listando atividades
    for(let atividade of atividades){
        section!.innerHTML += CriarItemDeAtividade(atividade);
    }
}

// rodando a função
atualizarListaDeAtividades();

// Função que entrará em contato com o formulário
const salvarAtividade = (event:any) => {
    // Nesse momento esse botão está previnindo o envio 
    event.preventDefault()
}

// Criar funções ajuda a você deixar o código mais organizado
const criarDiasSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03",
    ]

    let diasSelecao = ''

    for(let dia of dias) {
        const formatar = formatador(dia);
        const diaFormatado = `
        ${formatar.dia.numerico} de
        ${formatar.mes}
        `
        diasSelecao += `
        <option value=${dia}>${diaFormatado}</option>
        `
        document
        .querySelector('select[name = "dia"]')
        .innerHTML = diasSelecao
    }
}

criarDiasSelecao();