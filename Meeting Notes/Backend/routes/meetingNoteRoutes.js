const express = require('express');
const router = express.Router();
const {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getNote,
    createmultipleNote,
    filterNote,
    filterNoteByDateRange,
} = require('../controllers/meetingNoteController');

// Route to get all notes
router.get('/getAllNotes', getAllNotes);

// Route to create a new note
router.post('/createNote', createNote);

// Route to get a single note by id
router.get('/note/:id', getNote);

// Route to create multiple new note
router.post('/createmultipleNote', createmultipleNote);

// Route to update a note by id
router.put('/note/:id', updateNote);

// Route to delete a note by id
router.delete('/note/:id', deleteNote);

// Route to filter notes by title, content or action items
router.get('/filterNote', filterNote);

// Route to filter notes by date range
router.get('/filterNoteByDateRange', filterNoteByDateRange);

module.exports = router;
