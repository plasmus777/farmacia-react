import { useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import CartaoCategoria from "../cartaoCategoria/CartaoCategoria";
import { Plus } from "@phosphor-icons/react";
import { toastAlerta } from "../../../util/toastAlerta";
import { Link } from "react-router-dom";

function ListaCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    async function buscarCategorias() {
        try{
            await buscar('/categorias', setCategorias);
        } catch{
            toastAlerta('Ocorreu um erro ao buscar as categorias.', 'erro');
        }
    }

    useEffect(() => {
        buscarCategorias();
    }, [categorias.length]);

    return (
        <>
            {categorias.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full py-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categorias.map((categoria) => (
                            <>
                                <CartaoCategoria key={categoria.id} categoria={categoria} />
                            </>
                        ))}

                        <Link to='/cadastroCategoria'><Plus size={190} weight='bold' color='lightblue' className="border bg-blue-600 hover:bg-blue-800 flex items-center justify-center rounded-2xl" /></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaCategorias;