const express = require("express");

const router = express.Router();

const Note = require("../models/Note");

router.get("/", async (req, res) => {

  try {

    const notes =
      await Note.find().sort({
        createdAt: -1,
      });

    res.json(notes);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;