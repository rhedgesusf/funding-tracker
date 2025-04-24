import { useState } from 'react'
import './App.css'
import FundingLoader from './components/FundingLoader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FundingLoader />
    </>
  )
}

export default App

