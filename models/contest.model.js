import { Schema, model } from "mongoose";

const contestSchema = new Schema(
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
		contestType: {
			enums: [],
		},
		time: {},
	},
	{
		timestamps: true,
	}
);

const Contest = model("Contest", contestSchema);

export { Contest };

/**
 * question
 * questionType: [img, audio, video, text]
 * options
 * optionType: [img, audio, video, text]
 * generatedBy [ai, manual]
 * usedAt : use time
 * createdAt : time created
 */
