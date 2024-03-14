// Define variables for DOM elements
let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let clearBtn;
let noteList;

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
  console.log("Save button clicked.");
  const newNote = {
    title: noteTitle.value.trim(),
    text: noteText.value.trim()
  };

  // Check if the note has both a title and text
  if (newNote.title && newNote.text) {
    // Save the note to the server (assuming saveNote function exists)
    saveNote(newNote).then(() => {
      // Fetch and render updated notes
      getAndRenderNotes();
      // Reset form and buttons
      renderActiveNote();
    });
  } else {
    alert('Please enter both a title and text for the note.');
  }
};

// Function to handle creating a new note view
const handleNewNoteView = () => {
  console.log("New note button clicked.");
  // Reset active note and form
  activeNote = {};
  renderActiveNote();
};

// Function to reset form and buttons
const renderActiveNote = () => {
  console.log("Clear button clicked.");
  noteTitle.value = '';
  noteText.value = '';
  activeNote = {};
  hide(saveNoteBtn);
  hide(clearBtn);
};

// Function to handle rendering buttons based on form state
const handleRenderBtns = () => {
  console.log("Input detected in form.");
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
  console.log("Rendering note list:", notes);
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
  console.log("Fetching and rendering notes.");
  // Fetch notes from the server (assuming getNotes function exists)
  getNotes().then(renderNoteList);
};

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

  console.log("DOM elements assigned:", noteForm, noteTitle, noteText, saveNoteBtn, newNoteBtn, clearBtn, noteList);

  // Event listeners for buttons and form input
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', renderActiveNote);
  noteForm.addEventListener('input', handleRenderBtns);

  console.log("Event listeners attached.");

  // Fetch existing notes from the server and render them
  getAndRenderNotes();
}

// Initial rendering of the note form and buttons
renderActiveNote();

