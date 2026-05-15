"use client";

import { useState } from "react";

export default function ChatBox() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message) return;

    const userMessage = {
      role: "user",
      content: message
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            message
          })
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          role: "ai",
          content: data.reply
        }
      ]);

    } catch (err) {

      console.log(err);

    }

    setMessage("");

    setLoading(false);

  };

  return (

    <div className="w-full bg-white/5 border border-white/10 rounded-[40px] p-8 shadow-2xl backdrop-blur-xl">

      <h2 className="text-4xl font-black mb-8 text-cyan-400">
        AI Tutor Chat
      </h2>

      {/* CHAT AREA */}

      <div className="h-[500px] overflow-y-auto space-y-6 mb-6 pr-2">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`p-5 rounded-3xl max-w-[80%] ${
              msg.role === "user"
                ? "bg-cyan-500 ml-auto text-white"
                : "bg-zinc-900 border border-zinc-800"
            }`}
          >

            <p className="leading-8">
              {msg.content}
            </p>

          </div>

        ))}

        {loading && (

          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl max-w-[80%]">

            🤖 AI is typing...

          </div>

        )}

      </div>

      {/* INPUT */}

      <div className="flex gap-4">

        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Ask AI anything..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl p-5 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
        >

          Send

        </button>

      </div>

    </div>

  );

}