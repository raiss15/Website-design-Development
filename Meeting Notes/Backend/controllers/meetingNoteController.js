const MeetingNote = require('../models/MeetingNote');

// Fetch all meeting notes
exports.getAllNotes = async (req, res) => {
    try {
        
        const notes = await MeetingNote.find();
        res.json(notes);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Fetch all meeting notes
exports.filterNotes = async (req, res) => {
    try {
        
        const notes = await MeetingNote.find();
        res.json(notes);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Create a new meeting note
exports.createNote = async (req, res) => {
    try {
        const newNote = new MeetingNote(req.body);
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (err) {
        res.status(500).send('Server Error');
    }
    
   
};


// Get a single meeting note
exports.getNote = async (req, res) => {

    try {
        const note = await MeetingNote.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        res.json(note);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Create multiple meeting notes

exports.createmultipleNote = async (req, res) => {
    try {
        const newNotes = req.body.notes;
        // Use map to transform newNotes into an array of save promises
        const savePromises = newNotes.map(newNote => {
            const note = new MeetingNote(newNote);
            return note.save(); // Return the save promise for each note
        });

        // Wait for all save operations to complete
        const result = await Promise.all(savePromises);

        // Once all promises resolve, result will be an array of all saved notes
        res.json(result);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

// Update a meeting note
exports.updateNote = async (req, res) => {
    try {
        const updatedNote = await MeetingNote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNote);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Delete a meeting note
exports.deleteNote = async (req, res) => {
    try {
        await MeetingNote.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Note deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Filter a note by title, content, or action items
exports.filterNote = async (req, res) => {
  
    try {
        const keywordFilter = req.query.keyword;

        const filteredNote = await MeetingNote.find( {
            $or: [
              { title: new RegExp(keywordFilter, 'i') },
              { content: new RegExp(keywordFilter, 'i') },
              {
                'actionItems': {
                    $elemMatch: {
                        'value': {
                            $regex: keywordFilter,
                            $options: 'i' // case-insensitive
                        }
                    }
                }
              }
            ]
          });
        res.json(filteredNote);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Filter by the date range
exports.filterNoteByDateRange = async (req, res) => {
    try {      
        const { startDate, endDate } = req.query;
        const filteredNotes = await MeetingNote.find({
            creationDate: {
                $gte: new Date(startDate),
                $lte:  new Date(endDate)
            }
        });
        res.json(filteredNotes);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};