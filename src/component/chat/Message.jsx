import React from "react";

function Message() {
  function formSubmission(e) {
    e.preventDefault();
    console.log(e.target.children[0].value)
    
    e.target.children[0].value = ""
  }

  return (
    <div className="w-full p-3 ">
      <form action="post" className="submitForm flex flex-row justify-center " onSubmit={formSubmission}>
        <input
          type="text"
          name="message"
          id="messageEntry"
          className="inputField border-2 border-blue rounded-2xl min-h-15 w-4/5 p-4 shadow-xl sha"
        />
        <button
          type="submit"
          className=" -mx-12 h-15 text-2xl w-10 hover:opacity-50"
        >
          ⬆️
        </button>
      </form>
    </div>
  );
}

export default Message;
