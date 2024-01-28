import { Note } from '../models/note';
import { User } from '../models/user';

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error();
    throw Error(errorMessage);
  }
}

// login in
export async function getLogggedInUser(): Promise<User> {
  const response = await fetchData('/api/users', { method: 'Get' });
  return response.json();
}

// to send that the user has logged out
export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credntials: SignUpCredentials): Promise<User> {
  const response = await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credntials),
  });
  return response.json();
}

// to send that the user has logged in
export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credntials: LoginCredentials): Promise<User> {
  const response = await fetchData('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credntials),
  });
  return response.json();
}

// loging out
export async function logout() {
  await fetchData('/api/users/logout', { method: 'POST' });
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData('/api/notes', {
    method: 'GET',
  });

  return response.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

// Update from frontend
export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData('/api/notes/' + noteId, {
    method: 'PATCH',
    // headers beacuse we will send json data
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

// Delete from frontend
export async function deleteNote(noteId: string) {
  await fetchData('/api/notes/' + noteId, {
    method: 'DELETE',
  });
}
