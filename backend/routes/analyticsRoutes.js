const express = require("express");

const router = express.Router();

const Note = require("../models/Note");

router.get("/", async (req, res) => {

  try {

    const totalNotes =
      await Note.countDocuments();

    res.json({
      totalNotes,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;