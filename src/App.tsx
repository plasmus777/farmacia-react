import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home';
import Footer from './components/footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormularioCategoria from './components/categorias/formularioCategoria/FormularioCategoria';
import ListaCategorias from './components/categorias/listaCategorias/ListaCategorias';
import RemoverCategoria from './components/categorias/removerCategoria/RemoverCategoria';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <div className='min-h-[80vh] width-100 bg-gradient-to-r from-blue-500 to-blue-600'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/cadastroCategoria" element={<FormularioCategoria />} />
            <Route path="/editarCategoria/:id" element={<FormularioCategoria/>} />
            <Route path="/removerCategoria/:id" element={<RemoverCategoria />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
