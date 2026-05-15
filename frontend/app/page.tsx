"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import ChatBox from "../components/ChatBox";
import Flashcard from "../components/Flashcard";

export default function Home() {

  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const [summary, setSummary] = useState("");
  const [viva, setViva] = useState("");
  const [mcqs, setMcqs] = useState("");
  const [flashcards, setFlashcards] = useState("");

  const [stats, setStats] = useState({
    totalNotes: 0,
  });

  const [loading, setLoading] = useState(false);

  // AUTH CHECK
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

  }, [router]);

  // ANALYTICS
  useEffect(() => {

    fetch(
      "http://localhost:5000/api/analytics"
    )
      .then((res) => res.json())
      .then((data) => setStats(data));

  }, []);

  // PDF UPLOAD
  const uploadPDF = async () => {

    if (!file) {
      alert("Please select PDF");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("pdf", file);

    try {

      const res = await fetch(
        "http://localhost:5000/api/notes/upload",
        {
          method: "POST",

          headers: {
            Authorization:
              localStorage.getItem("token") || "",
          },

          body: formData,
        }
      );

      const data = await res.json();

      console.log(data);

      setSummary(
        data.summary || "No summary generated"
      );

      setViva(
        data.vivaQuestions ||
        "No viva questions generated"
      );

      setMcqs(
        data.mcqs ||
        "No MCQs generated"
      );

      setFlashcards(
        data.flashcards ||
        "No Flashcards generated"
      );

    } catch (err) {

      console.log(err);

      alert("Upload failed");

    }

    setLoading(false);

  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-x-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="ml-72">

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 w-full px-10 py-6 flex justify-between items-center border-b border-zinc-800 bg-black/40 backdrop-blur-xl">

          <div>

            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              StudyShared AI
            </h1>

            <p className="text-zinc-500 mt-1">
              AI Powered Study Operating System
            </p>

          </div>

          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold hover:scale-105 transition-all duration-300">
            Dashboard
          </button>

        </nav>

        {/* HERO */}
        <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 overflow-hidden">

          <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full top-10"></div>

          <div className="relative z-10">

            <h2 className="text-7xl font-black leading-tight mb-8">
              AI Powered <br />
              Study OS
            </h2>

            <p className="text-zinc-400 text-xl max-w-3xl leading-9">
              Upload PDFs, generate AI summaries,
              viva questions, MCQs, flashcards
              and AI tutoring.
            </p>

          </div>

        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 mb-16">

          <StatsCard
            title="PDFs Uploaded"
            value={stats.totalNotes.toString()}
          />

          <StatsCard
            title="AI Summaries"
            value="34"
          />

          <StatsCard
            title="Study Hours"
            value="120h"
          />

        </section>

        {/* UPLOAD */}
        <section className="px-10 mb-20">

          <div className="w-full bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10 shadow-2xl">

            <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">

              {/* LEFT */}
              <div className="flex-1">

                <h3 className="text-5xl font-black mb-6">
                  Upload Your Notes
                </h3>

                <div className="mt-6 space-y-4 text-lg">

                  <div className="bg-zinc-900/60 p-4 rounded-2xl">
                    ✅ AI Summary
                  </div>

                  <div className="bg-zinc-900/60 p-4 rounded-2xl">
                    🎤 Viva Questions
                  </div>

                  <div className="bg-zinc-900/60 p-4 rounded-2xl">
                    📝 MCQs
                  </div>

                  <div className="bg-zinc-900/60 p-4 rounded-2xl">
                    🧠 Flashcards
                  </div>

                  <div className="bg-zinc-900/60 p-4 rounded-2xl">
                    🤖 AI Tutor
                  </div>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex-1 w-full">

                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-8">

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      setFile(e.target.files?.[0] || null)
                    }
                    className="w-full bg-zinc-900 p-5 rounded-2xl border border-zinc-700 mb-6"
                  />

                  <button
                    onClick={uploadPDF}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-5 rounded-2xl text-2xl font-black hover:scale-105 transition-all duration-300"
                  >
                    {loading ? "Uploading..." : "Upload PDF"}
                  </button>

                  {file && (

                    <div className="mt-6 bg-zinc-900/70 border border-zinc-800 p-4 rounded-2xl">

                      <p className="text-zinc-300">
                        📄 {file.name}
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* SUMMARY */}
        {summary && (

          <section className="px-10 py-10">

            <div className="w-full bg-white/5 border border-cyan-500/20 rounded-[40px] p-10">

              <h2 className="text-5xl font-black text-cyan-400 mb-10">
                AI Summary
              </h2>

              <div className="space-y-6">

                {summary
                  .split(". ")
                  .filter((point: string) => point.trim() !== "")
                  .map((point: string, index: number) => (

                    <div
                      key={index}
                      className="bg-zinc-900/60 p-6 rounded-3xl border border-zinc-800"
                    >
                      ✅ {point}
                    </div>

                  ))}

              </div>

            </div>

          </section>

        )}

        {/* VIVA */}
        {viva.length > 0 && (

          <section className="px-10 py-10">

            <div className="w-full bg-white/5 border border-pink-500/20 rounded-[40px] p-10">

              <h2 className="text-5xl font-black text-pink-400 mb-10">
                Viva Questions
              </h2>

              <div className="space-y-6">

                {viva
                  .split("\n")
                  .filter((q: string) => q.trim() !== "")
                  .map((q: string, index: number) => (

                    <div
                      key={index}
                      className="bg-zinc-900/60 p-6 rounded-3xl border border-zinc-800"
                    >
                      🎤 {q}
                    </div>

                  ))}

              </div>

            </div>

          </section>

        )}

        {/* MCQS */}
        {mcqs.length > 0 && (

          <section className="px-10 py-10">

            <div className="w-full bg-white/5 border border-yellow-500/20 rounded-[40px] p-10">

              <h2 className="text-5xl font-black text-yellow-400 mb-10">
                MCQs
              </h2>

              <div className="space-y-6">

                {mcqs
                  .split("\n")
                  .filter((m: string) => m.trim() !== "")
                  .map((m: string, index: number) => (

                    <div
                      key={index}
                      className="bg-zinc-900/60 p-6 rounded-3xl border border-zinc-800"
                    >
                      📝 {m}
                    </div>

                  ))}

              </div>

            </div>

          </section>

        )}

        {/* FLASHCARDS */}
    {/* FLASHCARDS */}
{flashcards.length > 0 && (

  <section className="px-10 py-10">

    <div className="w-full bg-white/5 border border-cyan-500/20 rounded-[40px] p-10">

      <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-12">
        AI Flashcards
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

        {flashcards
          .split("Q:")
          .filter((card: string) => card.trim() !== "")
          .slice(0, 6)
          .map((card: string, index: number) => {

            const parts = card.split("A:");

            const question =
              parts[0] || "No Question";

            const answer =
              parts[1] || "No Answer";

            return (

              <Flashcard
                key={index}
                question={question.trim()}
                answer={answer.trim()}
              />

            );

          })}

      </div>

    </div>

  </section>

)}



        {/* AI CHAT */}
        <section className="px-10 pb-24">

          <ChatBox />

        </section>

      </div>

    </main>

  );

}