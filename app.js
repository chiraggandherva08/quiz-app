import e from "express";
import quizRouter from "./routes/quiz.route.js";
// import { connectDb } from "./config/connectDb.js";

const app = e();
// connectDb();

app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use("/", quizRouter);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
