import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose"
dotenv.config();
import Users from "./modules/users.module.js";
const FRONTEND_URL = process.env.FRONTEND_URL;

// Production-ready CORS options
// - Allows the FRONTEND_URL configured in the environment
// - Allows common local dev origins (http://localhost:5173 and http://localhost:3000)
// - Allows requests without an Origin (server-to-server, curl, mobile apps)
const allowedOrigins = new Set();
if (FRONTEND_URL) allowedOrigins.add(FRONTEND_URL);
allowedOrigins.add("http://localhost:5173");
allowedOrigins.add("http://localhost:3000");
allowedOrigins.add("https://simple-crud-mern-stack.vercel.app")

const corsOptions = {
    origin: function (origin, callback) {
        // If there's no origin (e.g., non-browser request) allow it
        if (!origin) return callback(null, true);

        if (allowedOrigins.has(origin)) {
            return callback(null, true);
        } else {
            console.warn(`Blocked CORS request from origin: ${origin}`);
            return callback(new Error('Not allowed by CORS'));
        }
    }
};

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors(corsOptions));

app.get("/api/users", async (req, res) => {
    try{
        const users = await Users.find();
        
        if(users.length === 0){
            return res.status(200).json({
                message: "No users recorded",
            })
        }

        res.status(200).json({
            users: users,
        })
    }
    catch(error){
        res.status(500).json({
            error: error.message,
        })
    }
})

app.post("/api/users", async (req, res) => {
    const { name, age, email, hobby } = req.body;
    try{
        await Users.create({name: name, age: age, email: email, hobby: hobby});
        res.status(200).json({
            message: "User added successfully",
        })
    }
    catch(error){
        res.status(500).json({
            error: error.message,
        })
    }
})

app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const user = await Users.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }

        res.status(200).json({
            message: "User was deleted successfully",
        })
    }
    catch(error){
        res.status(500).json({
            error: error.message,
        })
    }
})

app.get("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const user = await Users.findById(id);

        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }

        res.status(200).json({
            user: user,
        })
    }
    catch(error){
        res.status(500).json({
            error: error.message,
        })
    }
})

app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, age, email, hobby } = req.body;
    try{
        const user = await Users.findByIdAndUpdate(id, {name: name, age: age, email: email, hobby: hobby});
        const updatedUser = await Users.findById(id);
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        res.status(200).json({
            message: "User was updated successfully",
            user: updatedUser,
        })
    }
    catch(error){
        res.status(500).json({
            error: error.message,
        })
    }
})

mongoose.connect(process.env.MONGODB_DB_URI)
    .then(() => {
        console.log("Connected to the database"),
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    })
    .catch(() => {
        console.log("Failed connecting to the database")
    })