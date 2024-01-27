// sfc

import { Button, Form, Modal, ModalFooter } from 'react-bootstrap';
import { Note } from '../models/note';
import { NoteInput } from '../network/notes_api';
import { useForm } from 'react-hook-form';
import * as NotesApi from '../network/notes_api';

interface AddNoteDialagProps {
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddNoteDialog = ({ onDismiss, onNoteSaved }: AddNoteDialagProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  //   the handle submit function
  async function onSubmit(input: NoteInput) {
    try {
      const noteResponse = await NotesApi.createNote(input);
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register('title', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="Text" />
          </Form.Group>
        </Form>
      </Modal.Body>

      <ModalFooter>
        {/* it is important tp coonnet the submit button wth the form */}
        <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNoteDialog;
