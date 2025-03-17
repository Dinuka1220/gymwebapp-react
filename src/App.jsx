import { useState } from 'react'
import './App.css'
import Header from './Componants/Header';
import FoodCarousel from './Componants/Slider';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <FoodCarousel/>
    </>
  )
}

export default App
