const mongoose = require('mongoose');

const meetingNoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    actionItems: {
        // Array of objects with a string property and boolean property
        type: [{
            value: { type: String, required: true },
            completed: { type: Boolean, default: false }
        }]
        // type: [String],
    },
    completed: { type: Boolean, default: false },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MeetingNote', meetingNoteSchema);
