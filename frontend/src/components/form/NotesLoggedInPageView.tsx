import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from '../../models/note';
import * as NotesApi from '../../network/notes_api';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import Note from '../Note';
import styles from '../../styles/NotePages.module.css';
import AddEditNoteDialog from '../../components/AddEditNoteDialag';
import styleUtils from '../../styles/utils.module.css';

const NotesLoggedInPageView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesloading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className="g-4">
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            className={styles.note}
            onNoteClicked={(note) => setNoteToEdit(note)}
            onDeleteNoteClicked={deleteNote}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      {/* on click we should show up the note form */}
      <Button
        className={`mb-4 mt-3 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add new Note
      </Button>

      {notesloading && (
        <div className={styleUtils.spinnerContainer}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}
      {!notesloading && !showNotesLoadingError && (
        <>{notes.length > 0 ? notesGrid : <p>You don't have any notes.</p>}</>
      )}
      {/* On submit for the note form to dispaaear and add a new note */}
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}

      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            // takes the existing note , check for the ids , if true map teh updated Note otherwise map the existing Note
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesLoggedInPageView;
