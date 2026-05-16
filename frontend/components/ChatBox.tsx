"use client";

import { useState } from "react";

export default function ChatBox() {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!question) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {

      const res = await fetch(
        "https://study-share-ai.onrender.com/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: question,
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.reply ||
            "No response from AI",
        },
      ]);

    } catch (err) {

      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "AI Server Error",
        },
      ]);

    }

    setQuestion("");

    setLoading(false);

  };

  return (

    <section className="px-10 py-20">

      <div className="bg-white/5 border border-cyan-500/20 rounded-[40px] p-10 backdrop-blur-2xl">

        <h2 className="text-5xl font-black text-cyan-400 mb-10">
          AI Tutor Chat
        </h2>

        <div className="h-[400px] overflow-y-auto bg-black/30 rounded-3xl p-6 space-y-4 mb-6">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`p-4 rounded-2xl max-w-[80%]
              ${
                msg.role === "user"
                  ? "bg-cyan-500 ml-auto text-white"
                  : "bg-zinc-800 text-zinc-200"
              }`}
            >
              {msg.text}
            </div>

          ))}

          {loading && (

            <div className="bg-zinc-800 text-zinc-300 p-4 rounded-2xl w-fit">
              AI is typing...
            </div>

          )}

        </div>

        <div className="flex gap-4">

          <input
            type="text"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Ask anything..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-white outline-none"
          />

          <button
            onClick={askAI}
            className="px-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold"
          >
            Send
          </button>

        </div>

      </div>

    </section>

  );

}