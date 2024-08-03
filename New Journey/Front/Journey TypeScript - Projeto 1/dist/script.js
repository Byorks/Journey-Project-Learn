"use strict";
//Depois ver como remove do pnpm o dayjs
// Bibliotecas e códigos de terceiros
const formatador = (data) => {
    //Depois de colocado as dependencias no HTML 
    //estou adicionando as datas em objetos, para ficar organizado
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    };
};
// Objeto
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
};
// Lista
let atividades = [
    atividade,
    {
        nome: "Academia em grupo",
        data: new Date("2024-07-09 12:00"),
        finalizada: false
    },
    {
        nome: "Gamming session",
        data: new Date("2024-07-09 16:00"),
        finalizada: true
    }
];
// atividades = [];
// Arrow Function
const CriarItemDeAtividade = (atividade) => {
    let input = `
    <input
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox" 
    `;
    if (atividade.finalizada) {
        input += 'checked';
    }
    input += '>';
    // Retorna objeto
    const formatar = formatador(atividade.data);
    return `
     <div class="card-bg">
           ${input}

            <div>
                <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.50008 9.99999L9.16675 11.6667L12.5001 8.33332M18.3334 9.99999C18.3334 14.6024 14.6025 18.3333 10.0001 18.3333C5.39771 18.3333 1.66675 14.6024 1.66675 9.99999C1.66675 5.39762 5.39771 1.66666 10.0001 1.66666C14.6025 1.66666 18.3334 5.39762 18.3334 9.99999Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.41664 1.81833C9.46249 1.61593 10.5374 1.61593 11.5833 1.81833M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10083C15.5587 3.70019 16.3197 4.46406 16.9158 5.35083M1.8183 11.5833C1.6159 10.5375 1.6159 9.46252 1.8183 8.41667M16.8991 14.6742C16.2998 15.5587 15.5359 16.3198 14.6491 16.9158M18.1816 8.41667C18.384 9.46252 18.384 10.5375 18.1816 11.5833M3.1008 5.32583C3.70016 4.44128 4.46403 3.68023 5.3508 3.08417M5.3258 16.8992C4.44124 16.2998 3.6802 15.5359 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <span>${atividade.nome}</span>
            </div>
               
            <time class="short">
                ${formatar.dia.semana.curto}.
                ${formatar.dia.numerico} <br>
                ${formatar.hora}
            </time>
            
            <time class="full">
                ${formatar.dia.semana.longo}, 
                dia ${formatar.dia.numerico}
                de ${formatar.mes}
                às ${formatar.hora}h
            </time>
        </div>
    `;
};
const atualizarListaDeAtividades = () => {
    // Dom
    const section = document.querySelector('section');
    // Limpando as atividades para evitar duplicar
    section.innerHTML = '';
    // Verificar se a minha lista está vazia
    if (atividades.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
        return;
        // Com esse return paramos o código aqui.
    }
    // Listando atividades
    for (let atividade of atividades) {
        section.innerHTML += CriarItemDeAtividade(atividade);
    }
};
// rodando a função
atualizarListaDeAtividades();
// Função que entrará em contato com o formulário
const salvarAtividade = (event) => {
    // Nesse momento esse botão está previnindo o envio 
    event.preventDefault();
    // Pegando os itens do formulário e contruindo um objeto
    const dadosDoFormulario = new FormData(event.target);
    const nome = dadosDoFormulario.get('atividade');
    const dia = dadosDoFormulario.get('dia');
    const hora = dadosDoFormulario.get('hora');
    // Formatando no estilo -> data: new Date("2024-07-08 10:00"),
    const data = `${dia} ${hora}`;
    const novaAtividade = {
        // Maneira curta de construir um objeto
        nome,
        data,
        finalizada: false
    };
    const atividadeExiste = atividades.find((atividade) => {
        return new Date(atividade.data).toISOString() === new Date(novaAtividade.data).toISOString();
        // return atividade.data == novaAtividade.data;
    });
    if (atividadeExiste) {
        return alert('Dia/Hora não disponível');
    }
    console.log(novaAtividade);
    // Adicionando no começo da lista
    atividades = [novaAtividade, ...atividades];
    atualizarListaDeAtividades();
    alert(nome);
};
// Criar funções ajuda a você deixar o código mais organizado
const criarDiasSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03",
    ];
    let diasSelecao = '';
    for (let dia of dias) {
        const formatar = formatador(dia);
        const diaFormatado = `
        ${formatar.dia.numerico} de
        ${formatar.mes}
        `;
        diasSelecao += `
        <option value=${dia}>${diaFormatado}</option>
        `;
        document
            .querySelector('select[name = "dia"]')
            .innerHTML = diasSelecao;
    }
};
criarDiasSelecao();
const criarHorasSelecao = () => {
    let horasDisponiveis = '';
    for (let i = 6; i < 23; i++) {
        // Adicionando 0 antes da hora caso tenha apenas um caráctere ex: 1:00 - 01:00
        const hora = String(i).padStart(2, '0');
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`;
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`;
    }
    document
        .querySelector('select[name="hora')
        .innerHTML = horasDisponiveis;
};
criarHorasSelecao();
// Salvando se foi clicado no checkbox das atividades
const concluirAtividade = (event) => {
    const input = event.target;
    const dataDesteInput = input.value;
    const atividade = atividades.find((atividade) => {
        return atividade.data == dataDesteInput;
    });
    // Se não existir, só retorna
    if (!atividade) {
        return;
    }
    // Se for verdadeiro, vai virar falso, se for falso vai virar verdadeiro, isso com o uso da negação
    // Isso por conta do bool
    atividade.finalizada = !atividade.finaliada;
};
//# sourceMappingURL=script.js.map