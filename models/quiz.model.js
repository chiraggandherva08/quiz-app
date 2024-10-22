import { Schema, model } from "mongoose";

const quizSchema = new Schema(
	{
		title: {
			type: Schema.Types.String,
			default: "Quiz",
		},
		description: {
			type: Schema.Types.String,
			default: "",
		},
		timePerQuestion: {
			type: Schema.Types.Number,
			default: 30, // seconds
		},
		questions: [
			{
				type: Schema.Types.ObjectId,
				ref: "Question",
			},
		],
		genre: [
			{
				type: Schema.Types.String,
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Quiz = model("Quiz", quizSchema);

export { Quiz };
