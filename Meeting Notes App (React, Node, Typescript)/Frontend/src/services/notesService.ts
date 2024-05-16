const API_URL = 'http://localhost:3000/api/meetingNotes';

export const GetNotes = async () => {
    const response = await fetch(`${API_URL}/getAllNotes`);
    return response.json();
};

// Function to add a new note
export const AddNote = async (note: any) => {
    const response = await fetch(`${API_URL}/createNote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
    return response.json();
};

// Function to delete a note
export const DeleteNote = async (id: string) => {
    const response = await fetch(`${API_URL}/note/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};

// Function to update a note
export const UpdateNote = async (note: any, id: string) => {
    if(!id) return console.error('No id provided');
    const response = await fetch(`${API_URL}/note/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
    return response.json();
};