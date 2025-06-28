import express from "express";
import { protectRoute } from "../../middleWare/auth.middleware.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote
} from '../../controllers/notesController.js';

const router = express.Router();

router.get("/", protectRoute, getAllNotes);
router.get("/:id", protectRoute, getNoteById);
router.post("/", protectRoute, createNote);
router.put("/:id", protectRoute, updateNote);
router.delete("/:id", protectRoute, deleteNote);

export default router;