import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx"
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("ERROR in fetching Notes", error);
        toast.error("Failed to load Note");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading Notes....</div>}
        {notes.length ===0 && <NotesNotFound />}
        {notes.length > 0 && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            // <div> {note.title} | {note.content} </div>
          ))}
        </div>
        )}
      </div>
    </div>
  )}

  export default HomePage;
