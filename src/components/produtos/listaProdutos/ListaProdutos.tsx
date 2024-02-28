import { useEffect, useState } from "react";
import Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import { toastAlerta } from "../../../util/toastAlerta";
import { Hourglass } from "react-loader-spinner";
import CartaoProduto from "../cartaoProduto/CartaoProduto";
import { Link } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    async function buscarProdutos() {
        try {
            await buscar('/produtos', setProdutos);
        } catch (error: any) {
            toastAlerta('Ocorreu um erro ao buscar por produtos.', 'erro')
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, [produtos.length]);
    return (
        <>
            {produtos.length === 0 && (
                <Hourglass
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass="hourglass-wrapper mx-auto"
                />
            )}
            <div className='container mx-auto py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {produtos.map((produto) => (
                    <CartaoProduto key={produto.id} produto={produto} />
                ))}

                <Link to='/cadastroProduto'><Plus size={190} weight='bold' color='lightblue' className="border bg-blue-600 hover:bg-blue-800 flex items-center justify-center rounded-2xl" /></Link>
            </div>
        </>
    );
}

export default ListaProdutos;