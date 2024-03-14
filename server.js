const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'develop', 'public')));

// Notes data (temporary)
let notes = [];

// Routes
// Serve the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'develop', 'public', 'index.html'));
});

// Serve the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'develop', 'public', 'notes.html'));
});

// API routes
// GET endpoint to retrieve existing notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST endpoint to save new notes
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = notes.length.toString();
  notes.push(newNote);
  res.json(newNote);
});

// DELETE endpoint to delete a note by its ID
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  notes = notes.filter(note => note.id !== id);
  res.json({ message: 'Note deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
