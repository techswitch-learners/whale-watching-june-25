import { BrowserRouter } from 'react-router-dom';
import { Header, Navbar } from './components/Header/Header';

function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Navbar/>
    </BrowserRouter>

    </>
  )
}

export default App
