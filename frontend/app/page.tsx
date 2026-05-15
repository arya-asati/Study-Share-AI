"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Flashcard from "../components/Flashcard";

export default function Home() {

  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const [summary, setSummary] = useState("");
  const [mcqs, setMcqs] = useState("");
  const [flashcards, setFlashcards] = useState("");
  const [viva, setViva] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

  }, [router]);

  const uploadPDF = async () => {

    if (!file) {
      alert("Please select a PDF");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("pdf", file);

    try {

      const res = await fetch(
        "https://study-share-ai.onrender.com/api/notes/upload",
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

      setMcqs(
        data.mcqs || "No MCQs generated"
      );

      setFlashcards(
        data.flashcards || "No Flashcards generated"
      );

      setViva(
        data.vivaQuestions || "No Viva Questions generated"
      );

    } catch (err) {

      console.log(err);

      alert("Upload failed");

    }

    setLoading(false);

  };

  return (

    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* ANIMATED BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse"></div>

        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full animate-pulse"></div>

        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full animate-bounce"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]"></div>

      </div>

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="ml-72 relative z-10">

        {/* NAVBAR */}

        <nav className="sticky top-0 z-50 px-10 py-6 flex justify-between items-center border-b border-zinc-800 bg-black/40 backdrop-blur-2xl">

          <div>

            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              StudyShared AI
            </h1>

            <p className="text-zinc-500 mt-2">
              AI Powered Study Operating System
            </p>

          </div>

          <button
            onClick={() =>
              window.scrollTo({
                top: 900,
                behavior: "smooth",
              })
            }
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold hover:scale-105 transition-all duration-300"
          >
            Get Started
          </button>

        </nav>

        {/* HERO */}

        <section className="min-h-screen flex items-center justify-center px-10">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-6xl"
          >

            <div className="inline-block px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 mb-10">
              🚀 AI Powered Learning Platform
            </div>

            <h1 className="text-7xl md:text-9xl font-black leading-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 text-transparent bg-clip-text mb-10">
              StudyShared AI
            </h1>

            <p className="text-zinc-300 text-xl md:text-2xl leading-10 max-w-4xl mx-auto mb-12">
              Upload PDFs and instantly generate AI summaries,
              viva questions, MCQs, flashcards and smart tutoring.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center">

              <button
                onClick={() =>
                  window.scrollTo({
                    top: 1200,
                    behavior: "smooth",
                  })
                }
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xl font-black hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/30"
              >
                Upload Notes
              </button>

              <button
                onClick={() =>
                  alert("Demo video coming soon 🚀")
                }
                className="px-10 py-5 rounded-2xl border border-zinc-700 bg-white/5 text-xl font-bold hover:bg-white/10 transition-all duration-300"
              >
                Watch Demo
              </button>

            </div>

          </motion.div>

        </section>

        {/* FEATURES */}

        <section className="px-10 py-24">

          <div className="text-center mb-20">

            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              AI Features
            </h2>

            <p className="text-zinc-400 text-xl">
              Smart tools built for modern students.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {[
              {
                title: "AI Summary",
                desc: "Generate instant smart notes.",
                emoji: "📘",
              },
              {
                title: "Flashcards",
                desc: "Interactive AI memory cards.",
                emoji: "🧠",
              },
              {
                title: "Viva Questions",
                desc: "Prepare for oral exams easily.",
                emoji: "🎤",
              },
              {
                title: "MCQ Generator",
                desc: "Practice AI-generated quizzes.",
                emoji: "📝",
              },
              {
                title: "AI Tutor",
                desc: "Personal AI study assistant.",
                emoji: "🤖",
              },
              {
                title: "Analytics",
                desc: "Track learning progress.",
                emoji: "📊",
              },
            ].map((feature, index) => (

              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-10 hover:border-cyan-500/40 transition-all duration-500"
              >

                <div className="text-6xl mb-6">
                  {feature.emoji}
                </div>

                <h3 className="text-3xl font-black mb-4">
                  {feature.title}
                </h3>

                <p className="text-zinc-400 text-lg leading-8">
                  {feature.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </section>

        {/* UPLOAD */}

        <section className="px-10 pb-24">

          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-12">

            <h2 className="text-5xl font-black mb-8">
              Upload Your PDF
            </h2>

            <p className="text-zinc-400 text-xl mb-10">
              Generate summaries, viva questions and flashcards instantly.
            </p>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
              className="w-full bg-zinc-900 p-5 rounded-2xl border border-zinc-700 mb-8"
            />

            <button
              onClick={uploadPDF}
              disabled={loading}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-2xl font-black hover:scale-[1.02] transition-all duration-300"
            >
              {loading ? "Uploading..." : "Upload PDF"}
            </button>

          </div>

        </section>

        {/* SUMMARY */}

        {summary && (

          <section className="px-10 py-10">

            <div className="bg-white/5 border border-cyan-500/20 rounded-[40px] p-10">

              <h2 className="text-5xl font-black text-cyan-400 mb-10">
                AI Summary
              </h2>

              <p className="text-zinc-300 text-lg leading-10">
                {summary}
              </p>

            </div>

          </section>

        )}

        {/* MCQS */}

        {mcqs && (

          <section className="px-10 py-10">

            <div className="bg-white/5 border border-yellow-500/20 rounded-[40px] p-10">

              <h2 className="text-5xl font-black text-yellow-400 mb-10">
                MCQs
              </h2>

              <div className="space-y-6">

                {mcqs
                  .split("\n")
                  .filter((m) => m.trim() !== "")
                  .map((m, index) => (

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

        {/* VIVA */}

        {viva && (

          <section className="px-10 py-10">

            <div className="bg-white/5 border border-pink-500/20 rounded-[40px] p-10">

              <h2 className="text-5xl font-black text-pink-400 mb-10">
                Viva Questions
              </h2>

              <div className="space-y-6">

                {viva
                  .split("\n")
                  .filter((q) => q.trim() !== "")
                  .map((q, index) => (

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

        {/* FLASHCARDS */}

        {flashcards && (

          <section className="px-10 py-10">

            <div className="bg-white/5 border border-cyan-500/20 rounded-[40px] p-10">

              <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-12">
                AI Flashcards
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

                {flashcards
                  .split("Q:")
                  .filter((card) => card.trim() !== "")
                  .slice(0, 6)
                  .map((card, index) => {

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

        {/* FOOTER */}

        <footer className="border-t border-zinc-800 bg-black/40 backdrop-blur-2xl mt-24">

          <div className="px-10 py-20">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

              <div>

                <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-6">
                  StudyShared AI
                </h2>

                <p className="text-zinc-400 text-lg leading-9">
                  AI Powered Study Operating System for
                  modern engineering students.
                </p>

              </div>

              <div>

                <h3 className="text-2xl font-black mb-6">
                  Features
                </h3>

                <div className="space-y-4 text-zinc-400">

                  <p>📘 AI Summary</p>
                  <p>🧠 Flashcards</p>
                  <p>🎤 Viva Questions</p>
                  <p>📝 MCQ Generator</p>
                  <p>🤖 AI Tutor</p>

                </div>

              </div>

              <div>

                <h3 className="text-2xl font-black mb-6">
                  Platform
                </h3>

                <div className="space-y-4 text-zinc-400">

                  <p>⚡ Next.js Powered</p>
                  <p>🚀 AI Integrated</p>
                  <p>🌐 Cloud Deployment</p>
                  <p>📊 Smart Analytics</p>

                </div>

              </div>

            </div>

            <div className="border-t border-zinc-800 mt-16 pt-8 text-center">

              <p className="text-zinc-500">
                © 2026 StudyShared AI • Built By Arya Asati
              </p>

            </div>

          </div>

        </footer>

      </div>

    </main>

  );

}