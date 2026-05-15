"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupUser = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
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

  alert("Signup successful");

  router.push("/login");

} else {

  alert(data.message || "Signup failed");

}

    } catch (error) {

      console.log(error);

      alert("Signup failed");

    }

  };

  return (

    <main className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="w-full max-w-md bg-zinc-900 p-10 rounded-3xl border border-zinc-800 shadow-2xl">

        <h1 className="text-5xl font-black text-center mb-10 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Signup
        </h1>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-zinc-800 border border-zinc-700"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-zinc-800 border border-zinc-700"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-zinc-800 border border-zinc-700"
          />

          <button
            onClick={signupUser}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-2xl font-black"
          >
            Create Account
          </button>

        </div>

      </div>

    </main>

  );

}