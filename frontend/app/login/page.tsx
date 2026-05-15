"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        router.push("/");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Login failed");

    }

  };

  return (

    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-10 shadow-2xl">

        <div className="text-center mb-10">

          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-3">
            Login
          </h1>

          <p className="text-zinc-400">
            Welcome back to StudyShared AI
          </p>

        </div>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-zinc-900 border border-zinc-700 text-white p-5 rounded-2xl mb-6 outline-none focus:border-cyan-500"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-zinc-900 border border-zinc-700 text-white p-5 rounded-2xl mb-3 outline-none focus:border-cyan-500"
        />

        <div className="flex justify-end mb-8">

          <button
            onClick={() =>
              router.push("/forgot-password")
            }
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            Forgot Password?
          </button>

        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 text-white py-5 rounded-2xl text-2xl font-black shadow-lg shadow-cyan-500/30"
        >
          Login
        </button>

        <div className="text-center mt-8">

          <p className="text-zinc-400">

            Don&apos;t have an account?{" "}

            <span
              onClick={() =>
                router.push("/signup")
              }
              className="text-cyan-400 cursor-pointer hover:text-cyan-300 font-bold"
            >
              Sign Up
            </span>

          </p>

        </div>

      </div>

    </main>

  );

}