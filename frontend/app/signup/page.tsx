"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {

  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async () => {

    try {

      const res = await fetch(
        "https://study-share-ai.onrender.com/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {

        alert("Signup Successful");

        router.push("/login");

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.log(err);

      alert("Server Error");

    }

  };

  return (

    <main className="min-h-screen bg-black flex items-center justify-center text-white px-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-2xl">

        <h1 className="text-5xl font-black mb-10 text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Sign Up
        </h1>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700"
          />

          <button
            onClick={handleSignup}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xl font-black"
          >
            Create Account
          </button>

          <p className="text-center text-zinc-400">

            Already have account?{" "}

            <Link
              href="/login"
              className="text-cyan-400"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </main>

  );

}