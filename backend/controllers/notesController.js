const {
  generateSummary,
  generateMCQs,
  generateFlashcards,
  generateVivaQuestions
} = require("../services/aiService");

const Note = require("../models/Note");

const {
  extractTextFromPDF
} = require("../services/pdfService");

exports.uploadNote = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded"
      });

    }

    const extractedText =
      await extractTextFromPDF(req.file.path);

    // AI GENERATION
    const summary =
      await generateSummary(extractedText);

    const vivaQuestions =
      await generateVivaQuestions(extractedText);

    const mcqs =
      await generateMCQs(extractedText);

    const flashcards =
      await generateFlashcards(extractedText);

    // SAVE TO DATABASE
    await Note.create({

      filename: req.file.filename,

      summary,

      vivaQuestions,

      mcqs,

      flashcards,

      userId: req.user.userId,

    });

    // RESPONSE
    res.status(200).json({

      message: "PDF processed successfully",

      filename: req.file.filename,

      summary,

      vivaQuestions,

      mcqs,

      flashcards

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};