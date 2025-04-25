import React from "react";
import Tesseract from "tesseract.js";

function Imginpt({message}) {
    
  function handleImage(e) {
    // console.log(e)
    const file = e.target.files[0];
    if(file) {
        // setLoading(true);
        Tesseract.recognize(file, 'eng',{
            logger: m=> console.log(m),
        }).then(({data: {text}}) => {
            const newMess = [...message.messages,{sender: "bot", text}]
            message.setMessages(newMess);
        });
    }

  }
  return (
    <div>
      <input
        type="file"
        name="imageInpt"
        id="imageInpt"
        accept="image/*"
        onChange={handleImage}
        className="hidden"
      />
      <label htmlFor="imageInpt" className="mr-4 -ml-8 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-blockcursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-block">File</label>
    </div>
  );
}

export default Imginpt;
