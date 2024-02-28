function Home(){
    return (
        <>
          <div className="bg-blue-300 flex justify-center aspect-auto">
            <div className='container grid grid-cols-2 text-white'>
              <div className="flex flex-col gap-4 items-center justify-center py-4">
                <h2 className='text-7xl font-bold'>Projeto Farmácia - CRUD</h2>
                <p className='text-3xl m-5'>Frontend utilizando a biblioteca React para interagir com o backend do projeto farmacia, criado com Spring Boot.</p>
    
                <div className="flex justify-around gap-4">
                  <button className='rounded bg-blue-500 hover:bg-ble-900 text-white py-2 px-4'>Ver produtos</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
}
  
export default Home