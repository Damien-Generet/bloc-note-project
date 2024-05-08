import { useState } from "react";
import uuid from "react-uuid";
import Center from "./Center";
import Sidebar from "./Sidebar";
import './style/main.scss'


 const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
}

const removeNotesFromLocasStorages = (notes) => {
    localStorage.removeItem(notes)
}

const loadNotesFromLocalStorage = () => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  };


const App = () => {
  const [notes, setNotes] = useState(loadNotesFromLocalStorage());
  const [activeNote, setActiveNote] = useState(false);
  

 

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untittled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    saveNotesToLocalStorage(notes);
  };


  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
        if(note.id === activeNote) {
            return updatedNote;
        }

        return note;
    });

    setNotes(updatedNotesArray);
    saveNotesToLocalStorage(notes);

  };


//   const onDeleteNote = (idToDelete) => {
//     setNotes(notes.filter((note) => note.id !== idToDelete));
//     saveNotesToLocalStorage(notes);
//   };

const onDeleteNote = (idToDelete) => {
    // Filtrer les notes pour supprimer celle avec l'ID à supprimer
    const updatedNotes = notes.filter((note) => note.id !== idToDelete);

    // Mettre à jour l'état des notes
    setNotes(updatedNotes);

    // Enregistrer les notes mises à jour dans le localStorage
    saveNotesToLocalStorage(updatedNotes);
};

  const getActiveNote = () => {
    return notes.find((note) => note.id ===activeNote);
  }

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Center activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
};

export default App;
