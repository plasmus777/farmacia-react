import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { ChangeEvent, useEffect, useState } from "react";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { toastAlerta } from "../../../util/toastAlerta";

function FormularioCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        await buscar(`/categorias/${id}`, setCategoria);
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })

        console.log(JSON.stringify(categoria))
    }

    async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categoria, setCategoria)

                toastAlerta('A categoria foi atualizada com sucesso.', 'sucesso')
                retornar()

            } catch (error: any) {
                toastAlerta('Ocorreu um erro ao atualizar a categoria.', 'erro')
            }

        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria)

                toastAlerta('A categoria foi cadastrada com sucesso.', 'sucesso')

            } catch (error: any) {
                toastAlerta('Ocorreu um erro ao cadastrar a categoria.', 'erro')
            }
        }

        retornar()
    }

    function retornar() {
        navigate("/categorias")
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8 text-white">
                {id === undefined ? 'Cadastrar Nova Categoria' : 'Editar Categoria'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
                <div className="flex flex-col gap-2 text-center">
                    <label htmlFor="nome" className="text-white">Nome da categoria</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        name='nome'
                        className="border-2 border-white rounded p-2"
                        value={categoria.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                    <label htmlFor="descricao" className="text-white">Descrição da categoria</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        name='descricao'
                        className="border-2 border-white rounded p-2"
                        value={categoria.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-white bg-blue-400 hover:bg-blue-800 w-1/2 py-2 mx-auto block"
                    type="submit"
                >
                    {id === undefined ? 'Cadastrar' : 'Editar'}
                </button>
            </form>

            <button className="rounded text-white bg-blue-400 hover:bg-blue-800 w-1/4 py-2 mx-auto block mt-4" onClick={retornar}>Voltar</button>
        </div>
    );
}

export default FormularioCategoria;