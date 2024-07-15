export class Atividade  {
    nome: string;
    data: Date;
    finalizada: boolean;
    constructor(nome: string, data: string, finalizada:boolean) {
        this.nome = nome;
        this.data = new Date(data);
        this.finalizada = finalizada;
    }
}