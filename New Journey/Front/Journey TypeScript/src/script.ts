// import { Atividade } from "./atividade";

// Objeto
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
}

// let atividade3 = new Atividade("Gamming session", "2024-07-09 16:00", true);

// Lista s
const atividades = [
    atividade,
    {
        nome: "Academia em grupo",
        data: new Date ("2024-07-09 12:00"),
        finalizada: false
    },
    // atividade3
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

const section = document.querySelector('section');

for(let atividade of atividades){
    section!.innerHTML += CriarItemDeAtividade(atividade);
}