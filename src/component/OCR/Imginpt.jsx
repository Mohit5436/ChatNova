import React, { useState } from "react";
import Tesseract from "tesseract.js";

function Imginpt({ message }) {
    const [loading, setLoading] = useState(false);
  function handleImage(e) {
    // console.log(e)
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      // setLoading(true);
      Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        const newMess = [...message.messages, { sender: "bot", text }];
        message.setMessages(newMess);
        setLoading(false);
      });
    }
    setLoading(false);
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
      {!loading && (<label
        htmlFor="imageInpt"
        className="mr-4 -ml-8 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-blockcursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-block "
      >
        File
      </label>)}
      {loading && (<button
        disabled={"true"}
       className="load mr-4 -ml-8 cursor-wait px-4 py-2 rounded bg-gray-500 hover:bg-gray-600">Wait</button>)}
    </div>
  );
}

export default Imginpt;
