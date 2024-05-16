const express = require('express');
const connectDB = require('./connections/mongoConnection');
const meetingNoteRoutes = require('./routes/meetingNoteRoutes');

const app = express();
app.use(express.json());

// Allow cors for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // Allow all cross-origin methods
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

connectDB();

app.use('/api/meetingNotes', meetingNoteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

