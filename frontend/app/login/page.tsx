"use client";

import { useState } from "react";
import Link from "next/link";
import ParticlesBackground from "../../components/ParticlesBackground";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (

    <main className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center">

      {/* PARTICLES BACKGROUND */}
      <ParticlesBackground />

      {/* GLOW EFFECTS */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl">

          {/* TITLE */}
          <div className="text-center mb-10">

            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-4">
              Login
            </h1>

            <p className="text-zinc-400">
              Welcome back to StudyShared AI
            </p>

          </div>

          {/* FORM */}
          <div className="space-y-6">

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
            />

            <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xl font-black hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/30">
              Login
            </button>

          </div>

          {/* SIGNUP LINK */}
          <div className="text-center mt-8">

            <p className="text-zinc-400">
              Don&apos;t have an account?{" "}

              <Link
                href="/signup"
                className="text-cyan-400 font-bold hover:text-cyan-300"
              >
                Signup
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>

  );

}