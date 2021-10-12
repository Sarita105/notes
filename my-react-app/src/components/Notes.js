import React, { useState } from "react";
import "./Notes.css";
import {createNote} from './actions';
import {connect} from 'react-redux';
const Notes = ({addNote, notes}) => {
  console.log(notes)
  const [inputValue, setInputValue] = useState("");
  const [notes, setNotes] = useState([]);
  const createNote = () => {
    addNote(inputValue);
    // let noteTemp = [...notes];
    // let noteToAdd = { note: inputValue, isCompleted: false, id: noteTemp.length +1 };
    // noteTemp = [...noteTemp, noteToAdd];
    // localStorage.setItem('noteList', JSON.stringify(noteTemp));
    // setNotes(noteTemp);
  };
  const deleteNote = (id) => {
    let noteTemp = [...notes];
    noteTemp = noteTemp.filter(i => i.id !== id);
    localStorage.setItem('noteList', JSON.stringify(noteTemp));
    setNotes(noteTemp);
  };
  const updateStatus = (id) => {
    let noteTemp = [...notes];
    noteTemp = noteTemp.map(i => {
      if(i.id === id) {
        i.isCompleted = true;
      }
      return i;
    });
    localStorage.setItem('noteList', JSON.stringify(noteTemp));
    setNotes(noteTemp);
  };
  const searchNote = () => {
    const allNotes = JSON.parse(localStorage.getItem('noteList'));
    console.log(typeof(inputValue),allNotes,allNotes.length);
    if(allNotes.length > 0) {
      let searchedNote = allNotes.length > 0 && allNotes.filter(n => n.note === inputValue);
      setNotes(searchedNote);
    };
  };
  return (
    <>
      <input
        type="text"
        placeholder="type the name of note"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          createNote();
        }}
      >
        create note
      </button>
      <button onClick={() => {
        searchNote();
      }}>search note</button>
      <div className="note-list-container">
        {notes && notes.length > 0 && notes.map( n => <div className="notes-container">
          <p className="notes-name">{n.note}</p>
          <button
            onClick={() => {
              deleteNote(n.id);
            }}
          >
            delete note
          </button>
          {!n.isCompleted &&<button
            onClick={() => {
              updateStatus(n.id);
            }}
          >
            mark as completed
          </button>}
        </div>)}
      </div>
    </>
  );
};
const mapStateToProps = state => ({
  notes: state.todos.data,
});
const mapDispatchToProps = dispatch => ({
  addNote: note => dispatch(createNote(note)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Notes);