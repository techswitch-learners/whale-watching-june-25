import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import CustomButton from './components/formComponents/customButton/CustomButton'
import { ApprovedSightingsList } from './components/ApprovedSightingsList/ApprovedSightingsList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ApprovedSightingsList/>
    </>
  )
}

export default App
