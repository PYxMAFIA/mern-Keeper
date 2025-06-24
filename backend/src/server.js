import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "../config/db.js"
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000



//middleware
app.use(express.json()); // for use of req.body
app.use(cors()); //allow require from every URL

app.use("/notes", notesRoutes)


connectDB().then(()=>{
    app.listen(PORT, (req,res)=> {
    console.log('server is started 0n port:',PORT);
});
});

