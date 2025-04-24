import React from "react";
import History from './component/History.jsx'
import Chat from "./component/Chat.jsx";

export default function App(){

  return (
    <>
    <div className="w-screen h-screen flex flex-row justify-around gap-7 p-5">

    <History />
    <Chat />
      
    </div>
    
    </>
  )
}