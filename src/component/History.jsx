import React from "react";

function History({setComp}) {
  return (
    <div className="w-80 py-4 px-2 border-0 rounded-2xl shadow-2xl shadow-amber-900 text-center flex flex-col gap-4 bg-amber-50 opacity-80">
      {/* <p className='text-3xl pb-4'>This is under maintainance 😶‍🌫️ </p>
      <p className='text-xl'>see you soon</p>  */}
      <button
        type="button"
        className="border rounded-2xl h-15 bg-gray-500 hover:bg-gray-700"
        onClick={() => {
          console.log("chatting")
          setComp("chat");
        }}
      >
        Conversation with AI
      </button>
      <button
        type="button"
        className="border rounded-2xl h-15 bg-gray-500 hover:bg-gray-700"
        onClick={() => {
          console.log("set to image generator")
          setComp("image");
        }}
      >
        Image generator
      </button>
    </div>
  );
}

export default History;
