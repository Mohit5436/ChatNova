import React, { useState, useEffect, useRef } from "react";

function Image() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const bottomRef = useRef(null);

  async function apiCall(userMessage) {
    setLoading(true);
    const url = "https://chatgpt-42.p.rapidapi.com/texttoimage";
    const options = {
      
      method: "POST",
      headers: {
        'x-rapidapi-key': 'daf3099663msh6a7c3fb72c08931p1c39eejsn1c783288b5ed',
		'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
		'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: userMessage,
		width: 512,
		height: 512,
        
      }),
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      console.log(data);
      if (data.status == "false") throw new Error(data.error);

      setMessages((prev) => [...prev, { sender: "bot", text: (data.generated_image || "Error while working on your input") }]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error from server" },
      ]);
    }
    setLoading(false);
  }

  function formSubmission() {
    const userMessage = document
      .getElementById("messageEntry")
      .value.toString();
    if (!userMessage) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];

    setMessages(newMessages);
    setQuery("");

    apiCall(userMessage);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="border-l-1 border-black w-full p-5 ">
      <div className="border border-0 rounded-2xl shadow-2xl shadow-black bg-amber-50 opacity-90  w-full h-full flex flex-col items-center p-5">
        <h1 className="font-serif text-4xl">ChatNova Image generator🤖</h1>

        {/* this div is for conversation */}
        <div className="convo h-full w-full py-5 overflow-y-auto">
          <div className="chat flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[70%] ${
                  msg.sender === "user"
                    ? "self-end bg-blue-200 text-right"
                    : "self-start bg-gray-200 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="loader p-3 rounded-xl max-w-[70%] self-start bg-gray-200 text-left">
                Loading
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* this div is for input */}
        <div className="query w-full">
          <div className="w-full p-3">
            <form
              className="submitForm flex flex-row justify-center items-center"
              onSubmit={(e) => {
                e.preventDefault();
                formSubmission();
              }}
            >

              <textarea
                type="text"
                name="message"
                id="messageEntry"
                onKeyDown={(e) => {
                  if (e.code == "Enter") {
                    e.preventDefault();
                    formSubmission();
                  }
                }}
                className="inputField border-2 border-blue rounded-2xl min-h-15 w-4/5 p-4 shadow-xl"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={!query}
                id="submitBtn"
                className=" -mx-10 text-2xl w-10  rounded-2xl hover:opacity-50 focus:bg-amber-950 focus:opacity-50"
              >
                ⬆️
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Image;
