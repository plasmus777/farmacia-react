import Categoria from "./Categoria";

export default interface Produto{
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    categoria: Categoria | null;
}