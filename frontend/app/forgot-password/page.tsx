"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState("");

  const sendResetLink = async () => {

    try {

      const res = await fetch(
`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await res.json();

      alert(data.message);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };

  return (

    <main className="min-h-screen bg-black flex items-center justify-center px-6 text-white">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-10 shadow-2xl">

        <h1 className="text-5xl font-black text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-zinc-900 border border-zinc-700 text-white p-5 rounded-2xl mb-6 outline-none focus:border-cyan-500"
        />

        <button
          onClick={sendResetLink}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-5 rounded-2xl text-2xl font-black"
        >
          Send Reset Link
        </button>

      </div>

    </main>

  );

}