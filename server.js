const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'develop', 'public')));

// Path to the db.json file
const dbFilePath = path.join(__dirname, 'db', 'db.json');

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
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read the database file' });
      return;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST endpoint to save new notes
app.post('/api/notes', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read the database file' });
      return;
    }
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = generateUniqueId(); // You'll need to implement this function
    notes.push(newNote);
    fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to write to the database file' });
        return;
      }
      res.json(newNote);
    });
  });
});

// DELETE endpoint to delete a note by its ID
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read the database file' });
      return;
    }
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.id !== id);
    fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to write to the database file' });
        return;
      }
      res.json({ message: 'Note deleted successfully' });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Function to generate unique IDs (you may use a library like uuid)
function generateUniqueId() {
  // Implementation to generate unique IDs
}
