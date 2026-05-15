const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const upload = require("../utils/multerConfig");

const {
  uploadNote
} = require("../controllers/notesController");

router.post(
  "/upload",
  auth,
  upload.single("pdf"),
  uploadNote
);

module.exports = router;