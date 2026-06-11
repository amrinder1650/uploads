import { useState } from 'react'
import './App.css';
import DataAutomationHub from './components/DataAutomationHub';

function App() {
  const [count, setCount] = useState(null)

  return (
    <>
      <div>
        <h1>Welcome to the App</h1>
        <DataAutomationHub />
      </div>
    </>
  )
}

export default App
