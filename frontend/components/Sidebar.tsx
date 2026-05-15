"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {

  const router = useRouter();

  const logoutUser = () => {

    localStorage.removeItem("token");

    router.push("/login");

  };

  return (

    <div className="w-72 h-screen bg-black border-r border-zinc-800 p-6 fixed left-0 top-0 flex flex-col justify-between">

      {/* TOP */}
      <div>

        <h1 className="text-3xl font-black text-cyan-400 mb-10">
          StudyShared AI
        </h1>

        <div className="flex flex-col gap-4">

           <div className="mb-8">

  <p className="text-zinc-400 text-sm">
    Logged in as
  </p>

  <h2 className="text-xl font-bold text-white">
    Arya Asati
  </h2>

</div>

          <div className="space-y-5 mt-12">

  <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">
    Dashboard
  </button>

  <button className="w-full py-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition-all">
    AI Summary
  </button>

  <button className="w-full py-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition-all">
    Viva Questions
  </button>

  <button className="w-full py-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition-all">
    Analytics
  </button>

</div>

        </div>

      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={logoutUser}
        className="bg-red-500 hover:bg-red-600 p-4 rounded-xl font-bold transition-all duration-300"
      >
        Logout
      </button>

    </div>

  );

}