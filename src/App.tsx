import { ToastContainer } from 'react-toastify'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import { Home } from './pages/home/Home'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className='min-h-[80vh] width-100 bg-gradient-to-r from-blue-500 to-blue-600'>
        <Home />
      </div>
      <Footer />
    </>
  )
}

export default App
