"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import ParticlesBackground from "../../components/ParticlesBackground";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "https://study-share-ai.onrender.com/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (res.ok) {

        localStorage.setItem(
          "token",
          data.token
        );

        router.push("/");

      } else {

        alert(
          data.message ||
          "Invalid Credentials"
        );

      }

    } catch (err) {

      console.log(err);

      alert("Server Error");

    }

    setLoading(false);

  };

  return (

    <main className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative px-6">

      {/* PARTICLES BACKGROUND */}

      <ParticlesBackground />

      {/* GLOW EFFECTS */}

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full"></div>

      {/* LOGIN CARD */}

      <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10 shadow-2xl">

        <h1 className="text-6xl font-black text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-10">
          Login
        </h1>

        <div className="space-y-6">

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 text-white outline-none"
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 text-white outline-none"
          />

          {/* LOGIN BUTTON */}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-2xl font-black hover:scale-[1.02] transition-all duration-300"
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>

          {/* SIGNUP LINK */}

          <p className="text-center text-zinc-400 text-lg">

            Don't have an account?{" "}

            <Link
              href="/signup"
              className="text-cyan-400 font-bold hover:text-cyan-300"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </main>

  );

}