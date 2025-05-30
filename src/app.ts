import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes";
import connectDB from "./database";

dotenv.config();

var app = express();

app.use(express.json());
app.use(cors());

(async () =>{
    try{
        await connectDB()
        console.log("Connected to DB...")
    }catch(e: unknown){
        if(e instanceof Error) {
            console.error(`błąd połączenie z MongoDB ${e}`)

        }else{
            console.log(`nie znany błąd połączenia `, e)
        }
        process.exit(1)
    }
})()



// app.use(express.static(path.join(__dirname, "../public")));
app.use("/movies", movieRoutes)

app.get("/", (req, res) => {
    res.json({message: "api stared"});
});

export default app;