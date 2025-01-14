import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home';
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home/>}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
