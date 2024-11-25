// import { useState } from 'react'
import { useState } from 'react'
import GetAsset from './assets/GetAsset'

import reactLogo from './assets/react.svg'
import Update from './assets/Update'
import Navbar from './Navbar'
 // Updated import

import 'reactjs-popup/dist/index.css';
import Login from './assets/Login'
import Delete from './assets/Delete'
function App() {
  const [seen, setSeen] = useState(false)

  function togglePop () {
      setSeen(!seen);
  };
  // const [count, setCount] = useState(0)

  return (
    <>
   
      <Navbar />
     
     

  
   <Login />

   
    <Update/>
    <Delete />
   
    <GetAsset />
 
   

    </>
  )
}

export default App
