import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({});

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function main() {
	const assistant = await openai.beta.assistants.create({
		name: "Financial Analyst Assistant",
		instructions:
			"You are an expert financial analyst. Use you knowledge base to answer questions about audited financial statements.",
		model: "gpt-4o",
		tools: [{ type: "file_search" }],
	});
}

main();

const fileStreams = ["edgar/goog-10k.pdf", "edgar/brka-10k.txt"].map((path) =>
	fs.createReadStream(path)
);

// Create a vector store including our two files.
let vectorStore = await openai.beta.vectorStores.create({
	name: "Financial Statement",
});

await openai.beta.vectorStores.fileBatches.uploadAndPoll(
	vectorStore.id,
	fileStreams
);

// client.files.create(
//   file=open("mydata.jsonl", "rb"),
//   purpose="fine-tune"
// )

// const openai = new OpenAI(process.env.OPENAI_API_KEY);
