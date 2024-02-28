import { Link } from "react-router-dom"
import Produto from "../../../models/Produto"

interface CartaoProdutoProps{
    produto: Produto
}

function CartaoProduto({ produto }: CartaoProdutoProps) {
    return (
        <div className='border-white border flex flex-col rounded overflow-hidden justify-between'>
            <div className='bg-blue-500 size-full'>
                <div className="flex w-full bg-blue-800 py-2 px-4 items-center gap-4">
                    <h3 className='text-lg font-bold text-center uppercase text-white'>{produto.nome}</h3>
                </div>
                <div>
                    <div className='bg-blue-700'>
                        <h4 className='text-lg font-semibold uppercase text-white'>Preço: R$ {produto.preco}</h4>
                        <h4 className='text-lg font-semibold uppercase text-white'>Em Estoque: {produto.estoque} unidades</h4>
                        <h4 className='text-lg font-semibold uppercase text-white'>Categoria: {produto.categoria?.nome}</h4>
                    </div>
                    <p className='p-2'>{produto.descricao}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editarProduto/${produto.id}`} className='w-full text-white bg-blue-400 hover:bg-blue-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/removerProduto/${produto.id}`} className='text-white bg-red-500 hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Remover</button>
                </Link>
            </div>
        </div>
    )
}

export default CartaoProduto