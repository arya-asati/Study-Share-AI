const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


// SUMMARY
exports.generateSummary = async (text) => {

  try {

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",
            content:
              `Summarize these notes in simple points:\n\n${text}`
          }
        ],

        model: "llama-3.3-70b-versatile"

      });

    return completion.choices[0]
      .message.content;

  } catch (error) {

    console.log("SUMMARY ERROR:");
    console.log(error);

    return "Summary generation failed";

  }

};


// VIVA QUESTIONS
exports.generateVivaQuestions = async (text) => {

  try {

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",
            content:
              `Generate 10 viva questions from these notes:\n\n${text}`
          }
        ],

        model: "llama-3.3-70b-versatile"

      });

    return completion.choices[0]
      .message.content;

  } catch (error) {

    console.log("VIVA ERROR:");
    console.log(error);

    return "Viva generation failed";

  }

};


// MCQs
exports.generateMCQs = async (text) => {

  try {

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",
            content:
              `Generate 10 MCQs with answers from these notes:\n\n${text}`
          }
        ],

        model: "llama-3.3-70b-versatile"

      });

    return completion.choices[0]
      .message.content;

  } catch (error) {

    console.log("MCQ ERROR:");
    console.log(error);

    return "MCQ generation failed";

  }

};
exports.generateFlashcards = async (text) => {

  const prompt = `
Generate 10 flashcards from these notes.

Format:
Q:
A:

Notes:
${text}
`;

  const response =
    await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

  return response.choices[0]
    .message.content;
};
