import { model, Schema } from "mongoose";

const quizDumpSchema = new Schema({
	question: {
		type: Schema.Types.String,
		required: true,
		unique: true,
	},
	questionTypes: {
		type: Schema.Types.String,
		enum: ["img", "audio", "video", "text"],
		required: true,
	},
	options: {
		type: Schema.Types.Array,
		required: true,
	},
	optionType: {
		type: Schema.Types.String,
		required: true,
		enum: ["img", "audio", "video", "text"],
	},
	createdAt: {
		type: Schema.Types.Date,
		required: true,
	},
	usedAt: {
		type: Schema.Types.Date,
		required: true,
	},
});
