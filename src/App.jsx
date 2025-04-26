import React, { useState } from "react";
import History from './component/History.jsx'
import Chat from "./component/Chat.jsx";
import img from "./assets/bgImg.jpg"

export default function App(){
  const [comp, setComp] = useState("chat")

  return (
    <>
    <div className="w-screen h-screen flex flex-row justify-around gap-7 p-5 bg-cover bg-no-repeat bg-center " style={{backgroundImage: `url(${img})`}}>
    <History />
    <Chat />
      
    </div>
    
    </>
  )
}