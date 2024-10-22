import { Router } from "express";
import { createQuiz } from "../controllers/quiz.controller.js";
const router = Router();

router.get("/quiz", createQuiz);
router.post("/quiz", (req, res) => {});

export default router;
