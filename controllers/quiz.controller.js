import { Quiz } from "../models/quiz.model.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const createQuiz = async (req, res) => {
	try {
		const { genre, limit } = req.query;

		if (!genre || !limit) {
			throw new Error("Genre and limit are required");
		}

		const completion = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				messages: [
					{
						role: "user",
						content: `Generate a JSON object for a ${genre} quiz with ${limit} questions. Each question should be a key in the JSON object. The value for each key should be a list of 5 options where the 5th option is the correct answer and it must be present in first 4 options as well (don't include option number and question number). Format the JSON response as follows: { 'question title': ['option1', 'option2', 'option3', 'option4', 'correct_option'], ... }`,
					},
				],
				model: "gpt-4-0125-preview",
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
				},
			}
		);

		let quiz = completion.data.choices[0].message.content;
		const parsedQuiz = quiz.replace("```json", "").replace("```", "").trim();

		return res.json({
			data: JSON.parse(parsedQuiz),
			success: true,
			statusCode: 200,
			message: "Success",
		});
	} catch (error) {
		console.error(error);
		return res.json({
			success: false,
			statusCode: 500,
			data: null,
			message: "Internal Server Error",
		});
	}
};

export const saveQuiz = async (req, res) => {
	try {
		const quiz = new Quiz(req.body);
		await quiz.save();

		return res.json({
			data: quiz,
			success: true,
			statusCode: 200,
			message: "Quiz saved successfully",
		});
	} catch (error) {
		console.error(error);
		return res.json({
			success: false,
			statusCode: 500,
			data: null,
			message: "Internal Server Error",
		});
	}
};
