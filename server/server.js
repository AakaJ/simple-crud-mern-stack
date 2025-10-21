import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose"
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: ["http://localhost:5173"],
}
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_DB_URI)
    .then(
        console.log("Connected to the database"),
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    )
    .catch(
        console.log("Failed connecting to the database"),
    )