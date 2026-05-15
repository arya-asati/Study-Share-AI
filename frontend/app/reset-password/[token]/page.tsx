"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {

  const params = useParams();

  const token = params.token;

  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const resetPassword = async () => {

    try {

      const res = await fetch(
`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await res.json();

      alert(data.message);

      router.push("/login");

    } catch (error) {

      console.log(error);

      alert("Reset failed");

    }

  };

  return (

    <main className="min-h-screen bg-black flex items-center justify-center px-6 text-white">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-10 shadow-2xl">

        <h1 className="text-5xl font-black text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-zinc-900 border border-zinc-700 text-white p-5 rounded-2xl mb-6 outline-none focus:border-cyan-500"
        />

        <button
          onClick={resetPassword}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-5 rounded-2xl text-2xl font-black"
        >
          Reset Password
        </button>

      </div>

    </main>

  );

}