import {inputLogin} from '../../domain/types/authentication'

class LoginUseCase{
    //constructor() {}
    async run(input: inputLogin){
        try{
           const pessoa = await LoginRepository.login(); 
           if(pessoa.sexo === "m")
        }catch{}
    }
}
export default LoginUseCase;


export class Pessoa{
    private nome: string;
    private age: number;
    private sexo: "masculino" | "feminino";

    constructor(ageRecebido: number, sexoRecebido: "masculino" | "feminino"){
        this.age = ageRecebido;
        this.sexo = sexoRecebido;
    }
    getNome():string{
        return this.nome;
    }
    setNome(inputNome: string):void{
        this.nome = inputNome;
    }
}

const PessoaUm = new Pessoa(38, "feminino");
PessoaUm.setNome("Weslley");

const PessoaDois = new Pessoa(32, "masculino");
PessoaDois.setNome("Gustavo");

PessoaDois.getNome
