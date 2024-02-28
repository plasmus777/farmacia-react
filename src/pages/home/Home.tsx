import { useNavigate } from "react-router-dom";
import ListaProdutos from "../../components/produtos/listaProdutos/ListaProdutos"

function Home() {
  let navigate = useNavigate();

  return (
    <>
      <div className="bg-blue-300 flex justify-center aspect-auto">
        <div className='container grid grid-cols-2 text-white'>
          <img src="https://images.vexels.com/media/users/3/208409/isolated/preview/77ba71d7c00825ad8f6c4c5fa4f702f0-icone-de-traco-de-cesta-de-farmacia.png?w=330&fmt=webp" alt="Farmácia" />

          <div className="flex flex-col gap-2 items-center justify-center py-4">
            <h2 className='text-7xl font-bold'>Projeto Farmácia - CRUD</h2>
            <p className='text-3xl m-5'>Frontend utilizando a biblioteca React para interagir com o backend do projeto farmacia, criado com Spring Boot.</p>

            <div className="flex justify-around gap-4">
              <button className='rounded bg-blue-500 hover:bg-blue-900 text-white py-2 px-4' onClick={() => navigate('/produtos')}>Ver produtos</button>
              
              <button className='rounded px-4 bg-blue-500 hover:bg-blue-800' onClick={() => navigate('/cadastroProduto')}>Novo Produto</button>
            </div>
          </div>
        </div>
      </div>

      <ListaProdutos />
    </>
  )
}

export default Home