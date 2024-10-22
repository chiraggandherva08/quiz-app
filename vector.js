import OpenAI from "openai";

const open_ai = new OpenAI({
	apiKey: ""
});

// async function threads() {
// 	const thread = await open_ai.beta.threads.create({
// 		messages: [
// 			{
// 				role: "user",
// 				content:
// 					"How many shares of AAPL were outstanding at the end of of October 2023?",
// 				// Attach the new file to the message.
// 				attachments: [
// 					{
// 						file_id: "file-9hHHoJj0ZIJ79io3vFueb4vd",
// 						tools: [{ type: "file_search" }],
// 					},
// 				],
// 			},
// 		],
// 	});

// 	console.log(thread);
// 	console.log(thread.tool_resources?.file_search);
// }

// threads();
// World geo
async function runThread() {
	const stream = open_ai.beta.threads.runs
		.stream("thread_DXdC7yHdLS66WcCs1K5VV4zd", {
			assistant_id: "asst_UXdkuslivuF5LU2zjWvektRH",
		})
		.on("textCreated", () => console.log("assistant >"))
		.on("toolCallCreated", (event) => console.log("assistant " + event.type))
		.on("messageDone", async (event) => {
			if (event.content[0].type === "text") {
				const { text } = event.content[0];
				const { annotations } = text;

				const citations = [];

				let index = 0;
				for (let annotation of annotations) {
					text.value = text.value.replace(annotation.text, "[" + index + "]");
					const { file_citation } = annotation;
					if (file_citation) {
						const citedFile = await open_ai.files.retrieve(
							file_citation.file_id
						);
						citations.push("[" + index + "]" + citedFile.filename);
					}
					index++;
				}

				console.log(JSON.parse(text.value.split("```")[1].slice(4).trim()));
				// console.log(citations); // citations : files used
			}
		});
}

runThread();
