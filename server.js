const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//routes will go here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Notes code 
let notes = [];

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
