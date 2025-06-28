import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    {
        timestamps: true //inbuilt for time stamps in mongoose
    });

const Note = mongoose.model("Note", noteSchema);

export default Note;