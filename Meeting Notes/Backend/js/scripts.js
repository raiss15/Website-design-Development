window.onload = function() {
    fetchNotes();
    document.getElementById('createNoteBtn').addEventListener('click', openModal);
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('saveNoteBtn').addEventListener('click', saveNewNote);
};

function fetchNotes() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/notes.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            var notes = JSON.parse(this.responseText);
            renderNotes(notes);
        }
    };
    xhr.send();
}

function renderNotes(notes, append = false) {
    var notesList = document.getElementById('notesList');
    if (!append) {
        notesList.innerHTML = ''; // Clear existing notes if not appending
    }
    notes.forEach(function(note) {
        var noteElement = createNoteElement(note);
        notesList.appendChild(noteElement);
    });
}

function createNoteElement(note) {
    var truncatedContent = note.content.split(" ").slice(0, 10).join(" ") + "...";
    var noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `<h2 contenteditable="true">${note.title}</h2>` +
                            `<div class="content" contenteditable="true" data-fullcontent="${note.content}" data-truncatedcontent="${truncatedContent}">${truncatedContent}</div>` +
                            `<ul class="actions" style="display: none;">${note.actionItems.map((item, itemIndex) =>
                                `<li class="action-item">` +
                                `<input type="checkbox" id="action-${note.title}-${itemIndex}">` +
                                `<label for="action-${note.title}-${itemIndex}" contenteditable="true">${item}</label>` +
                                `</li>`).join('')}</ul>` +
                            `<div class="date">Created on: ${note.creationDate}</div>`;

    // Attach event listeners specifically to checkboxes and labels to avoid toggling content
    noteElement.querySelectorAll('.action-item input[type="checkbox"]').forEach(function(checkbox, index) {
        checkbox.addEventListener('change', function(event) {
            // Prevent the event from bubbling up to potentially editable elements
            event.stopPropagation();
            var actionText = noteElement.querySelectorAll('.action-item label')[index];
            // Toggle 'completed' class based on checkbox status
            if (this.checked) {
                actionText.classList.add('completed');
            } else {
                actionText.classList.remove('completed');
            }
        });
    });

    // Click listener for content and title only, excluding action items
    var contentDiv = noteElement.querySelector('.content');
    var titleDiv = noteElement.querySelector('h2');
    function toggleContent(event) {
        if (contentDiv.getAttribute('data-truncatedcontent')) {
            if (contentDiv.textContent.endsWith("...")) {
                contentDiv.textContent = contentDiv.getAttribute('data-fullcontent');
                noteElement.querySelector('.actions').style.display = 'block';
            } else {
                contentDiv.textContent = contentDiv.getAttribute('data-truncatedcontent') + "...";
                noteElement.querySelector('.actions').style.display = 'none';
            }
            noteElement.classList.toggle('expanded');
        }
        event.stopPropagation();
    }
    contentDiv.addEventListener('click', toggleContent);
    titleDiv.addEventListener('click', toggleContent);

    return noteElement;
}

function openModal() {
    document.getElementById('newNoteModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('newNoteModal').style.display = 'none';
}

function saveNewNote() {
    const title = document.getElementById('newNoteTitle').value;
    const content = document.getElementById('newNoteContent').value;
    const actionItems = document.getElementById('newNoteActionItems').value.split(',').map(item => item.trim());

    const newNote = {
        title: title || "New Note",
        content: content || "Note content...",
        actionItems: actionItems.length > 0 ? actionItems : ["Action Item 1"],
        creationDate: new Date().toLocaleString()
    };

    renderNotes([newNote], true);
    closeModal();

    document.getElementById('newNoteTitle').value = '';
    document.getElementById('newNoteContent').value = '';
    document.getElementById('newNoteActionItems').value = '';
}
