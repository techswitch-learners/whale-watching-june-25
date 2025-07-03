import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import CustomButton from './components/formComponents/customButton/CustomButton'
import WhaleInfoPage from './page/WhaleInfo/WhaleInfoPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Router>
        <Routes>
          <Route path='/info' element={<WhaleInfoPage />}></Route>
        </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
