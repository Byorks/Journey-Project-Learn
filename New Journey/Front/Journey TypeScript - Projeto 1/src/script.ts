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
    let input = `
    <input
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox" 
    `;

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

const atualizarListaDeAtividades = () => {
    // Dom
    const section = document.querySelector('section');

    // Limpando as atividades para evitar duplicar
    section!.innerHTML = '';

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

    // Pegando os itens do formulário e contruindo um objeto
    const dadosDoFormulario = new FormData(event.target);

    const nome = dadosDoFormulario.get('atividade');
    const dia = dadosDoFormulario.get('dia');
    const hora = dadosDoFormulario.get('hora');
    // Formatando no estilo -> data: new Date("2024-07-08 10:00"),
    const data = `${dia} ${hora}`

    const novaAtividade = {
        // Maneira curta de construir um objeto
        nome,
        data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => {
        return new Date(atividade.data).toISOString() === new Date(novaAtividade.data).toISOString();
        // return atividade.data == novaAtividade.data;
        })

    if (atividadeExiste) {
        return alert('Dia/Hora não disponível');
    }
    console.log(novaAtividade)
    // Adicionando no começo da lista
    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades();

    alert(nome)
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
        .querySelector('select[name = "dia"]')!
        .innerHTML = diasSelecao
    }
}
criarDiasSelecao();

const criarHorasSelecao = () => {
    let horasDisponiveis = '';

    for(let i = 6; i < 23; i++){
        // Adicionando 0 antes da hora caso tenha apenas um caráctere ex: 1:00 - 01:00
        const hora = String(i).padStart(2, '0');
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    document
    .querySelector('select[name="hora')!
    .innerHTML = horasDisponiveis;
}
criarHorasSelecao();

// Salvando se foi clicado no checkbox das atividades
const concluirAtividade = (event:any) => {
    const input = event.target;
    const dataDesteInput = input.value;

    const atividade : any = atividades.find((atividade) => {
        return atividade.data == dataDesteInput
    })

    // Se não existir, só retorna
    if(!atividade) {
        return
    }
    
    // Se for verdadeiro, vai virar falso, se for falso vai virar verdadeiro, isso com o uso da negação
    // Isso por conta do bool
    atividade.finalizada = !atividade.finaliada; 
}