require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes =
  require("./routes/authRoutes");

const testRoutes =
  require("./routes/testRoutes");

const notesRoutes =
  require("./routes/notesRoutes");

const chatRoutes =
  require("./routes/chatRoutes");

const historyRoutes =
  require("./routes/historyRoutes");



const app = express();
const resetRoutes =
require("./routes/resetRoutes");

app.use("/api/auth", resetRoutes);

app.use(cors());
app.use(express.json());

/* ROUTES */

app.use("/api/auth", authRoutes);

app.use("/api/notes", notesRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/history", historyRoutes);


/* DATABASE */

mongoose.connect(process.env.MONGO_URI)

  .then(() =>
    console.log("✅ MongoDB Connected")
  )

  .catch((err) =>
    console.log(
      "❌ MongoDB Error:",
      err
    )
  );

/* HOME ROUTE */

app.get("/", (req, res) => {

  res.send(
    "🚀 StudyShared AI Backend Running"
  );

});

/* SERVER */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🔥 Server running on port ${PORT}`
  );

});
const analyticsRoutes =
require("./routes/analyticsRoutes");

app.use(
"/api/analytics",
analyticsRoutes
);
app.post("/api/auth/signup", async (req, res) => {

  const { name, email, password } =
    req.body;

  return res.json({
    message: "Signup successful",
  });

});
app.post("/api/chat", async (req, res) => {

  const { message } = req.body;

  console.log(message);

  return res.json({
    reply:
      "AI Tutor Response: " + message,
  });

});