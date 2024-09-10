import { endereco } from "./endereco";
import { User } from "./user";

export class Ong {
    id?: number;
    nome!: string;
    cnpj!: string;
    descricao!: string;
    telefone!: string;
    email!: string;
    tipoDoacao!: string[];
    endereco!: endereco;
}
