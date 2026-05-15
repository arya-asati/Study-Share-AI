"use client";

import { useState } from "react";

interface FlashcardProps {
  question: string;
  answer: string;
}

export default function Flashcard({
  question,
  answer,
}: FlashcardProps) {

  const [isFlipped, setIsFlipped] =
    useState(false);

  return (

    <div
      className="w-full h-[320px] perspective cursor-pointer"
      onClick={() =>
        setIsFlipped(!isFlipped)
      }
    >

      {/* CARD */}
      <div
        className={`relative w-full h-full duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >

        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden rounded-[35px] overflow-hidden border border-cyan-500/20 shadow-2xl">

          {/* BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 animate-gradient"></div>

          {/* GLOW */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/30 blur-[120px]"></div>

          {/* CONTENT */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">

            <div className="flex justify-between items-center">

              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl text-sm tracking-[4px]">
                QUESTION
              </div>

              <div className="text-3xl">
                🧠
              </div>

            </div>

            <div className="flex-1 flex items-center justify-center">

              <h2 className="text-3xl font-black text-center leading-relaxed">
                {question}
              </h2>

            </div>

            <p className="text-center text-white/70">
              Click to reveal answer
            </p>

          </div>

        </div>

        {/* BACK */}
        <div className="absolute w-full h-full rounded-[35px] overflow-hidden border border-purple-500/20 shadow-2xl rotate-y-180 backface-hidden">

          {/* BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-blue-700 to-cyan-500 animate-gradient"></div>

          {/* GLOW */}
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-400/30 blur-[120px]"></div>

          {/* CONTENT */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">

            <div className="flex justify-between items-center">

              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl text-sm tracking-[4px]">
                ANSWER
              </div>

              <div className="text-3xl">
                ⚡
              </div>

            </div>

            <div className="flex-1 flex items-center justify-center">

              <p className="text-2xl font-bold text-center leading-relaxed">
                {answer}
              </p>

            </div>

            <p className="text-center text-white/70">
              Click to flip back
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}