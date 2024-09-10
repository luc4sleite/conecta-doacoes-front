import { endereco } from "./endereco";
import { User } from "./user";

export class Empresa {
    id?: number;
    cnpj!: string;
    nome!: string;
    descricao!: string;
    telefone!: string;
    email!: string;
    endereco!: endereco;
    user!: User;
}
