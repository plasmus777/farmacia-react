import { useEffect, useState } from "react"
import Produto from "../../../models/Produto"
import { useNavigate, useParams } from "react-router-dom"
import { buscar, deletar } from "../../../services/Service"
import { toastAlerta } from "../../../util/toastAlerta"

function RemoverProduto() {
  const [produto, setProduto] = useState<Produto>({} as Produto)

  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto)
    } catch (error: any) {
      toastAlerta('Ocorreu um erro ao buscar por produtos.', 'erro')
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/produtos")
  }

  async function removerProduto() {
    try {
      await deletar(`/produtos/${id}`)

      toastAlerta('o produto foi apagado com sucesso.', 'sucesso')

    } catch (error) {
      toastAlerta('Ocorreu um erro ao apagar o produto.', 'erro')
    }

    retornar()
  }
  
  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Remover produto</h1>

      <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar o produto selecionado?</p>

      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-blue-600 text-white font-bold text-2xl'>Produto</header>
        <div className="p-4">
          <p className='text-xl h-full'>{produto.nome}</p>
          <p>Preço: R$ {produto.preco}</p>
          <p>{produto.descricao}</p>
          <p>Em estoque: {produto.estoque} unidades</p>
          <p>Categoria: {produto.categoria?.nome}</p>
        </div>
        <div className="flex">
          <button className='text-white bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
          <button className='w-full text-white bg-blue-400 hover:bg-blue-600 flex items-center justify-center' onClick={removerProduto}>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default RemoverProduto