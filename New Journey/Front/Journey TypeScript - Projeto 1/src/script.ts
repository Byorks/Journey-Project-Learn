// Objeto
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
}

// Lista
const atividades = [
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

// Arrow Function
const CriarItemDeAtividade = (atividade : {nome:string, data:Date,finalizada: boolean}) => {
    let input = '<input type="checkbox" ';

    if(atividade.finalizada) {
        input += 'checked';
    }

    input += '>';

    return `
     <div>
           ${input}
            <span>${atividade.nome}</span>
            <time>${atividade.data}</time>
        </div>
    `
}

// Dom
const section = document.querySelector('section');

for(let atividade of atividades){
    section!.innerHTML += CriarItemDeAtividade(atividade);
}