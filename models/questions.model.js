import { model, Schema } from "mongoose";

const questionSchema = new Schema({
    contestId: {
        
    },
    question: {
        type: Schema.Types.String,
        required: true,
    },
    options: {
        type: Schema.Types.Array,
        required: true,
    },
    correctOption: {
        type: Schema.Types.String,
        required: true,
    },
    genre: [
        {
            type: Schema.Types.String,
            required: true,
        },
    ],
});

const Question = model("Question", questionSchema);

export { Question };
