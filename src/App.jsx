import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Componants/Header';
import RecipeSlider from './Componants/slider';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <RecipeSlider/>
    </>
  )
}

export default App
