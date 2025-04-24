import React, { useState, useEffect, useRef } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const bottomRef = useRef(null);

  // const localStorage = window.localStorage;
  // const storedMessages = localStorage.getItem("messages");

  async function dataFetch(userMessage) {
    try {
      const res = await fetch("https://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error from server" },
      ]);
    }
  }

  function formSubmission(e) {
    e.preventDefault();
    const userMessage = e.target.children[0].value.trim();
    if (!userMessage) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];

    setMessages(newMessages);
    setQuery("");

    dataFetch(userMessage);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="border-l-1 border-black w-full p-5 ">
      <div className="border border-0 rounded-2xl shadow-2xl shadow-black bg-amber-50 opacity-90  w-full h-full flex flex-col items-center p-5">
        <h1 className="font-serif text-4xl">AI Chatbot 🤖</h1>

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
            <div ref={bottomRef} />
          </div>
        </div>

        {/* this div is for input */}
        <div className="query w-full">
          <div className="w-full p-3">
            <form
              className="submitForm flex flex-row justify-center"
              onSubmit={formSubmission}
            >
              <textarea
                type="text"
                name="message"
                id="messageEntry"
                className="inputField border-2 border-blue rounded-2xl min-h-15 w-4/5 p-4 shadow-xl"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={!query}
                className=" -mx-12 h-15 text-2xl w-10 hover:opacity-50"
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

export default Chat;
