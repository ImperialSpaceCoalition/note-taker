// Define variables for DOM elements
let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let clearBtn;
let noteList;

// Check if the current URL is the notes page
if (window.location.pathname === '/notes') {
  // Assign DOM elements
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelector('.list-group');

  // Event listener for saving a note
  saveNoteBtn.addEventListener('click', handleNoteSave);

  // Event listener for creating a new note
  newNoteBtn.addEventListener('click', handleNewNoteView);

  // Event listener for clearing the form
  clearBtn.addEventListener('click', renderActiveNote);

  // Event listener for input events in the note form
  noteForm.addEventListener('input', handleRenderBtns);

  // Fetch existing notes from the server and render them
  getAndRenderNotes();
}

// Function to show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Function to hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// Function to handle saving a note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value.trim(),
    text: noteText.value.trim()
  };

  // Check if the note has both a title and text
  if (newNote.title && newNote.text) {
    // Save the note to the server
    saveNote(newNote).then(() => {
      // Fetch and render updated notes
      getAndRenderNotes();
      // Reset form and buttons
      renderActiveNote();
    });
  }
};

// Function to handle deleting a note
const handleNoteDelete = (id) => {
  // Delete the note from the server
  deleteNote(id).then(() => {
    // Fetch and render updated notes
    getAndRenderNotes();
    // Reset form and buttons
    renderActiveNote();
  });
};

// Function to handle viewing a note
const handleNoteView = (e) => {
  e.preventDefault();
  const noteId = e.target.closest('.list-group-item').dataset.noteId;
  // Fetch the note details from the server
  getNoteById(noteId).then((note) => {
    // Update active note and render it
    activeNote = note;
    renderActiveNote();
  });
};

// Function to handle creating a new note view
const handleNewNoteView = () => {
  // Reset active note and form
  activeNote = {};
  renderActiveNote();
};

// Function to handle rendering buttons based on form state
const handleRenderBtns = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
    hide(clearBtn);
  } else {
    show(saveNoteBtn);
    show(clearBtn);
  }
};

// Function to render the list of notes
const renderNoteList = (notes) => {
  noteList.innerHTML = '';
  notes.forEach((note) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.dataset.noteId = note.id;
    const span = document.createElement('span');
    span.innerText = note.title;
    span.addEventListener('click', handleNoteView);
    li.appendChild(span);
    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger', 'delete-note');
    deleteBtn.addEventListener('click', () => handleNoteDelete(note.id));
    li.appendChild(deleteBtn);
    noteList.appendChild(li);
  });
};

// Function to fetch and render existing notes
const getAndRenderNotes = () => {
  // Fetch notes from the server
  getNotes().then(renderNoteList);
};

// Function to reset form and buttons
const renderActiveNote = () => {
  noteTitle.value = '';
  noteText.value = '';
  activeNote = {};
  hide(saveNoteBtn);
  hide(clearBtn);
};

// Initial rendering of the note form and buttons
renderActiveNote();

