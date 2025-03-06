import User from "../Models/userSchema.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

export const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newUser = new User({ name, email, phone, message });
    await newUser.save();
    
    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.PASS_MAIL,
        pass: process.env.PASS_KEY,
      },
    });

    const mailOptions = {
      from: process.env.PASS_MAIL,
      to: email,
      subject: "Thank You for Getting in Touch!",
      text: `Hello ${name},\n\nThank you for reaching out! and also thank you for exploring my protfolio. I have received your message and will get back to you as soon as possible.\n\nBest regards,\n[Sanjay Kumar R A]`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
    });

    res
      .status(200)
      .json({ message: "Inquiry Submitted Successfully. A confirmation email has been sent.", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
