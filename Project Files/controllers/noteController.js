const Note = require("../models/Note");

// Create a note
const createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const note = new Note({ title, content, tags, user: req.userId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch all notes of the logged-in user
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, content, tags },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.userId });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
