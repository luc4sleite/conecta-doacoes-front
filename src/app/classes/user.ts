import { endereco } from "./endereco";

export class User {
    id?: number;
    email?: string;
    nome?: string;
    role?: string;
    telefone?: string;
    endereco?: endereco;
}
