const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = require("../models/User");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const resetToken =
    crypto.randomBytes(32).toString("hex");

  user.resetToken = resetToken;

  user.resetTokenExpire =
    Date.now() + 3600000;

  await user.save();

  const resetURL =
`https://study-share-ai.vercel.app/reset-password/${resetToken}`;

  const transporter =
    nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: user.email,
    subject: "Password Reset",
    html: `
      <h2>Reset Your Password</h2>
      <a href="${resetURL}">
        Click Here
      </a>
    `,
  });

  res.json({
    message: "Reset link sent",
  });

});


const bcrypt = require("bcryptjs");

router.post(
  "/reset-password/:token",
  async (req, res) => {

    try {

      const user =
        await User.findOne({
          resetToken: req.params.token,

          resetTokenExpire: {
            $gt: Date.now(),
          },
        });

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid or expired token",
        });

      }

      const hashedPassword =
        await bcrypt.hash(
          req.body.password,
          10
        );

      user.password = hashedPassword;

      user.resetToken = undefined;

      user.resetTokenExpire =
        undefined;

      await user.save();

      res.json({
        message:
          "Password reset successful",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);
module.exports = router;