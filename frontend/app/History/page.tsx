"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {

  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {

    fetch(
      "http://localhost:5000/api/history",
      {
        headers: {
          Authorization:
            localStorage.getItem("token") || "",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setNotes(data));

  }, []);

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-black text-cyan-400 mb-10">
        Upload History
      </h1>

      <div className="space-y-6">

        {notes.map((note: any, index: number) => (

          <div
            key={index}
            className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800"
          >

            <h2 className="text-2xl font-bold mb-3">
              📄 {note.filename}
            </h2>

            <p className="text-zinc-400">
              {new Date(note.createdAt)
                .toLocaleString()}
            </p>

          </div>

        ))}

      </div>

    </main>

  );

}