import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

var app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.json({message: "api stared"});
});

console.log("hello")
export default app;