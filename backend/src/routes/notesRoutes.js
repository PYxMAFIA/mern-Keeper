import express from "express";
import Note from "../../models/Note.js"

const router = express.Router();

router.get("/", async (req,res)=>{
    try {
        const note = await Note.find().sort({createdAt:-1}); //newest first
        res.status(200).json(note);
    } catch (error) {
        console.error("ERROR in getting all the notes",error);
        res.status(500).json({message:"Internal Server error"});
    }
});

router.get("/:id", async (req,res)=>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("ERROR in getting all the notes",error);
        res.status(500).json({message:"Internal Server error"});
    }
});

router.post("/", async (req,res)=>{
    try {
        const {title,content} = req.body;
        const note = new Note({title,content}); // can also be ({title:title,content:content})
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("ERROR in createNote",error);
        res.status(500).json({message:"Internal Server error"});
    }
});

router.put("/:id", async (req,res)=>{
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new: true,});
        if(!updatedNote){
            return res.status(404).json({message:"Note not found"});
        };
         res.status(200).json(updatedNote);
    } catch (error) {
        console.error("ERROR in Updating the note",error);
        res.status(500).json({message:"Internal Server error"});
    }
   
});

router.delete("/:id", async(req,res)=>{
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote){
            return res.status(404).json({message:"Note not found"});
        };
        res.status(200).json({message: "Note delete successfully!"});
    } catch (error) {
        console.error("ERROR in deleting the note",error);
        res.status(500).json({message:"Internal Server error"});
    }
    
});

export default router;