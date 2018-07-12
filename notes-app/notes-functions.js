//console.log(uuidv4())

// Check for existing saved data
const getSavedNotes = function() {
    const notesJSON = localStorage.getItem('notes');

    if (notesJSON !== null){
        return JSON.parse(notesJSON);
    }else{
        return [];
    }
}

// Generate the DOM structure for notes
const generateNoteDOM = function(note){
    /* const noteEl = document.createElement('p'); */
    const noteEl = document.createElement('div');
    const textEl = document.createElement('a');
    textEl.setAttribute('href',`/edit.html#${note.id}`);
    const button = document.createElement('button');
    // Setup the remove note button
    button.textContent = 'x'
    button.addEventListener('click', function(){
        removeNote(note.id);
        saveNotes(notes);
        renderNotes(notes, filters);
    })
    noteEl.appendChild(button);
    // Setup the note title text
    if (note.title.length > 0){
        textEl.textContent = note.title;
    }else{
        textEl.textContent= 'Unnamed note'
    }

    //do before paragraph content
    noteEl.appendChild(textEl);

    return noteEl;
}

// Sort your notes by one of three ways
const sortNotes = function(notes, sortBy) {
    if (sortBy === 'byEdited'){
        return notes.sort(function(a,b){
            if (a.updatedAt > b.updatedAt){
                return -1;
            }else if (a.updatedAt < b.updatedAt) {
                return 1;
            }else { return 0;}
        })
    }else if (sortBy === 'byCreated') { 
        return notes.sort(function(a,b){
            if (a.createdAt > b.createdAt){
                return -1;
            }else if (a.createdAt < b.createdAt){
                return 1;
            }else {return 0;}
        })

    }else if (sortBy === 'byAlpha'){
         return notes.sort(function (a,b){
             if (a.title.toLowerCase() < b.title.toLowerCase()){
                 return -1;
             } else if (a.title.toLowerCase() > b.title.toLowerCase()){
                 return 1;
             } else {return 0}
         });
    }else{ return notes;}
}

// Render the notes to the page
const renderNotes = function (notes, filters){
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter( function (note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    });
    //console.log(filteredNotes);  see if it works

    document.querySelector('#notes').innerHTML = '';

    filteredNotes.forEach(function (note){
        const noteEl = generateNoteDOM(note);
        document.querySelector('#notes').appendChild(noteEl);
    })
}

// Remove a note from list and storage
const removeNote = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id === id;
    });
    //note exists so chuck it
    if (noteIndex > -1){
        notes.splice(noteIndex, 1);
    }
}

// Saving notes one note at a time
const saveNotes =  function(notes){
    localStorage.setItem('notes',JSON.stringify(notes));

}

// When edited ?
const genLastEdited = function(timestamp){
    return `Last edited ${moment(timestamp).fromNow()}`
}