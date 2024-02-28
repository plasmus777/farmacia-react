import { useEffect, useState } from "react"
import Categoria from "../../../models/Categoria"
import { useNavigate, useParams } from "react-router-dom"
import { buscar, deletar } from "../../../services/Service"
import { toastAlerta } from "../../../util/toastAlerta"

function RemoverCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria);
        } catch (error: any) {
            toastAlerta('Ocorreu um erro ao buscar as categorias.', 'erro')
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/categorias")
    }

    async function deletarCategoria() {
        try {
            await deletar(`/categorias/${id}`);

            toastAlerta('A categoria foi apagada com sucesso.', 'sucesso')

        } catch (error) {
            toastAlerta('Ocorreu um erro ao apagar a categoria.', 'erro')
        }

        retornar()
    }

    return (
      <div className='container w-1/3 mx-auto'>
        <h1 className='text-4xl text-center py-4 text-white'>Remover Categoria</h1>
  
        <p className='text-center font-semibold mb-4 text-white'>Você deseja apagar a categoria selecionada?</p>
  
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-blue-600 text-white font-bold text-2xl'>{categoria.nome}</header>
        <p className='p-8 text-3xl bg-blue-400 h-full text-white'>{categoria.descricao}</p>
        <div className="flex">
          <button className='text-white bg-blue-500 hover:bg-blue-800 w-full py-2' onClick={retornar}>Voltar</button>
          <button className='w-full text-white bg-red-500 hover:bg-red-800 flex items-center justify-center' onClick={deletarCategoria}>
            Apagar Categoria
          </button>
        </div>
      </div>
      </div>
    )
  }
  
  export default RemoverCategoria