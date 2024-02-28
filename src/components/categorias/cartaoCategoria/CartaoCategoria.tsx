import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria"

interface CartaoCategoriaProps{
    categoria: Categoria
}

function CartaoCategoria({categoria}: CartaoCategoriaProps) {
    return (
      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-blue-800 text-white font-bold text-2xl'>{categoria.nome}</header>
        <p className='p-8 text-3xl bg-blue-500 h-full text-white'>{categoria.descricao}</p>
        <div className="flex">
          <Link to={`/editarCategoria/${categoria.id}`} className='w-full text-white bg-blue-600 hover:bg-blue-800 flex items-center justify-center py-2'>
            <button>Editar</button>
          </Link>
          <Link to={`/removerCategoria/${categoria.id}`} className='text-white bg-red-500 hover:bg-red-700 w-full flex items-center justify-center'>
            <button>Remover</button>
          </Link>
        </div>
      </div>
    )
  }

  export default CartaoCategoria;