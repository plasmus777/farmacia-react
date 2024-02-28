import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { ChangeEvent, useEffect, useState } from "react";
import Produto from "../../../models/Produto";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { toastAlerta } from "../../../util/toastAlerta";

function FormularioProduto() {
    let navigate = useNavigate();
  
    const { id } = useParams<{ id: string }>();
  
    const [categorias, setCategorias] = useState<Categoria[]>([]);
  
    const [categoria, setCategoria] = useState<Categoria>({
      id: 0,
      nome: '',
      descricao: ''
    });
  
    const [produto, setProduto] = useState<Produto>({
      id: 0,
      nome: '',
      descricao: '',
      preco: 0,
      estoque: 0,
      categoria: null
    });
  
    async function buscarProdutoPorId(id: string) {
      await buscar(`/produtos/${id}`, setProduto);
    }
  
    async function buscarCategoriaPorId(id: string) {
      await buscar(`/categorias/${id}`, setCategoria);
    }
  
    async function buscarCategorias() {
      await buscar('/categorias', setCategorias);
    }
  
    useEffect(() => {
      buscarCategorias();
      if (id !== undefined) {
        buscarProdutoPorId(id);
        console.log(categoria);
  
      }
    }, [id]);
  
    useEffect(() => {
      setProduto({
        ...produto,
        categoria: categoria,
      });
    }, [categoria]);
  
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setProduto({
        ...produto,
        [e.target.name]: e.target.value,
        categoria: categoria
      });
    }
  
    function retornar() {
      navigate('/produtos');
    }
  
    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();
  
      console.log({ produto });
  
      if (id != undefined) {
        try {
          await atualizar(`/produtos`, produto, setProduto);
          toastAlerta('O produto foi atualizado com sucesso.', 'sucesso');
          retornar();
        } catch (error: any) {
            toastAlerta('Ocorreu um erro ao atualizar o produto.', 'erro');
        }
      } else {
        try {
          await cadastrar(`/produtos`, produto, setProduto);
  
          toastAlerta('O produto foi cadastrado com sucesso.', 'sucesso');
          retornar();
        } catch (error: any) {
            toastAlerta('Ocorreu um erro ao cadastrar o produto.', 'erro');
        }
      }
    }
  
    const carregandoCategoria = categoria.nome === '';
  
    return (
      <div className="container flex flex-col mx-auto items-center bg-blue-700 p-4 rounded">
        <h1 className="text-4xl text-center my-8 text-white">{id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}</h1>
  
        <form onSubmit={gerarNovoProduto} className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-white">Nome do produto</label>
            <input
              value={produto.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="Nome"
              name="nome"
              required
              className="border-2 border-white rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="text-white">Descrição do produto</label>
            <input
              value={produto.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="Descrição"
              name="descricao"
              required
              className="border-2 border-white rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="preco" className="text-white">Preço do produto (R$)</label>
            <input
              value={produto.preco}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="0"
              name="preco"
              required
              className="border-2 border-white rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="estoque" className="text-white">Unidades em estoque</label>
            <input
              value={produto.estoque}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="0"
              name="estoque"
              required
              className="border-2 border-white rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white">Categoria do produto</p>
            <select name="categoria" id="categoria" className='border p-2 border-white rounded' onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
              <option value="" selected disabled>Selecione uma categoria:</option>
              {categorias.map((categoria) => (
                <>
                  <option value={categoria.id} >{categoria.nome}</option>
                </>
              ))}
            </select>
          </div>
          <button disabled={carregandoCategoria} type='submit' className='rounded disabled:bg-blue-200 bg-blue-400 hover:bg-blue-800 text-white font-bold w-1/2 mx-auto block py-2'>
            {carregandoCategoria ? <span>Carregando...</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
          </button>

          <button className="rounded text-white-100 bg-blue-400 hover:bg-blue-800 w-1/4 py-2 mx-auto block text-white" onClick={retornar}>Voltar</button>
        </form>
      </div>
    );
  }
  
  export default FormularioProduto