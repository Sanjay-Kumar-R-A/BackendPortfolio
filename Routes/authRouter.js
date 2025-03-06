import express from "express";
import { submitInquiry } from "../Controllers/authController.js";

const router = express.Router();

// Route for handling portfolio contact form submissions
router.post("/contact", submitInquiry);

export default router;
