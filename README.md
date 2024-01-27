# A - BACKEND

## A.1 - Setting the Environment and Installing Libraries

1. Create package.json file
   npm init -y
2. Set typescript
   npm instal --save-dev typescript
3. Set tsconfig.json
   npx tsc --init
4. Install Express
   npm install express
   npm i --save-dev @types/express
5. Create an express app
6. npm install --save-dev nodemon
7. npm install -D ts-node
8. Add "scripts": {
   "start": "nodemon src/server.ts"}
   this will let you use npm start dev
9. Change to "main": "dist/server.js",
10. npm i -D eslint, to check for errors
11. npx eslint . --ext .ts , to check for problems in the selected file
12. Add "lint": "eslint . --ext .ts" to scripts so that we can use directly npm run lint
13. install the pluggin ESLInt

## A.2 - Setting MongoDB and Mongoose Setup

1. Create our cluster
2. .env file to write the DATABASE_URL and the PORT.
3. npm i dotenv
4. npm i mongoose
5. import .env and mongoose in server.ts
6. Connect mongoose.
7. Keep in mind that it returns a promise so after that we should define what will hapen next, like starting and listening up to the server, so we use .then(()=>{}) incase everything run succesfully. After that we should add .catch(console.error) to return the error.
8. npm i envalid.
   If we didnt provide the server with a port, the server will run on an undefined port which is dangerous.
   For this reason we use cleanEnv from envalid and we pass through it all the important information regarding the URL and Port in validateEnv.ts in util. So we can get rid of writing process.env and instead write .env

## A.3 - MongoDB Model setup

1. Crate the note model in models.
2. create a schema for our notes wich each contains a title and a text and timestamps. then we created the typescript for our model and finally exported it.
3. in app.ts we will have all of our endpints
4. get the notes of our database and return them using app.get
   app.get('/', async (req,res) => {
   try {
   // if it was able to get them, get them by json(notes)
   const notes = await Notemodel.find().exec()
   res.status(200).json(notes)

   } catch (error) {
   // if it coudnt get them
   console.error(error);
   res.status(500)
   }
   })

5. Instead of repating the catching error we can use app.use((error: unknown, req: Request, res: Response, next: NextFunction) => { }

## A.4 Routes

1. In app.ts, we arent going to write the whole code instead:
   app.use('/api/notes', RouteComponent)
   and the RouteComponenets takes the fucntion:
   router.get('/', NotesController.getNotes);
   and the NotesController has the async function

2. Now to Post a note:

   1. First, app.use(express.json());, this means that the body can accept json from us
   2. it needs three parts:
      1. request from body what will be added
      2. try { the function of NoteModels.create(title, text)} and respond the note using.json
      3. catch(error) {next(error)}

3. npm i morgan
   npm i --save-dev @types/morgan, to show in the terminal what have we run on postamn, like:
   POST /api/notes 201 154.958 ms - 137

## A.5 Error handling

1. npm i http-errors
2. npm i -D @types/http-errors

# B - Frontend

## B.1 Create React

1. npx create-react-app frontend --template typescript
2. npm install react-bootstrap bootstrap
3. import 'bootstrap/dist/css/bootstrap.min.css'; in index.tsx

## B.2 Fetch Notes

1.  Create folder models: note.ts, where we should state the shape and interface of each note
2.  in app.tsx, insert:

    1.  const [notes, setNotes] = useState<Note[]>([]);
        Note[]: is the type of the useState from note.ts
    2.  to load the notes one time when the app starts, we use useEffect, in the useEffect: 1. first we need to fetch the local host of all notes
        const response = await fetch('/api/notes', {method: 'GET',});
        Here, we took out http://localhost:5000, adn save in package.json as a proxy. So that we allow the connecton of the 2 different hosts. 2. to get the notes we use json:
        const notes = await response.json();
        setNotes(notes); 3. because we are using await we need an async function for that plus error handling:
        useEffect(() => {
        async function loadNotes() {
        try {
        const response = await fetch('/api/notes', {
        method: 'GET',
        });
        const notes = await response.json();
        setNotes(notes);
        } catch (error) {
        console.error(error);
        alert(error);
        }
        }
        loadNotes();
        }, []);

3.  We created 2 folders:
4.  Componenets: Note.tsx, html for the note, useing the interface:
    interface NoteProps {
    note: NoteModel;
    }
5.  models: note.ts,
    export interface Note {
    \_id: string;
    title: string;
    text?: string;
    createdAt: string;
    updatedAt: string;
    }
6.  created separtae folders for styling , global and for the note

7.  To create th add button functionality

    1.  We define the post methode in notes_api:
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
    2.  We create the componenent: AddNoteDialog.
    3.  In the app.tsx:
        <Button onClick={() => setShowAddNoteDialog(true)}>Add new Note</Button>

              {showAddNoteDialog && (
             <AddNoteDialog onDismiss={() => setShowAddNoteDialog} />

        )}

    4.  npm i react-hook-form

8.  npm install react-icons --save

9.  Create Delete note from frontend

    1.  Get api : notes_api.ts
        export async function deleteNote(noteId: string) {
        await fetchData('/api/notes/' + noteId, {
        method: 'DELETE',
        });
        }
    2.  Define the deleteNote function in the app.tsx by calling the delete api from note_api.ts, where the states are present.
        async function deleteNote(note: NoteModel) {
        try {
        await NotesApi.deleteNote(note.\_id);
        setNotes(notes.filter((existingNote) => existingNote.\_id !== note.\_id));
        } catch (error) {
        console.error(error);
        alert(error);
        }
        }
    3.  in Note.tsx, wehere we have the note form which incude the trash icon we define:
        onClick={(e) => {
        onDeleteNoteClicked(note);
        e.stopPropagation();
        }}
    4.  then add it as a props in App.tsx

10. Create Update note from frontend 1. we need another entry in our note_api:
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
    } 2. we will update the addNote function:
    we adjust the submit button to take 2 functions: submit new note and update editted notes.
    async function onSubmit(input: NoteInput) {
    try {
    let noteResponse: Note;
    if (noteToEdit) {
    noteResponse = await NotesApi.updateNote(noteToEdit.\_id, input);
    } else {
    noteResponse = await NotesApi.createNote(input);
    }

          onNoteSaved(noteResponse);
        } catch (error) {
          console.error(error);
          alert(error);
        }

    }

11. now we need to catch it , so whenever we click on any note the form muct appear: onNoteClicked
    {noteToEdit && (
    <AddEditNoteDialog
    noteToEdit={noteToEdit}
    onDismiss={() => setNoteToEdit(null)}
    onNoteSaved={(updatedNote) => {
    // takes the existing note , check for the ids , if true map teh updated Note otherwise map the existing Note
    setNotes(
    notes.map((existingNote) =>
    existingNote.\_id === updatedNote.\_id
    ? updatedNote
    : existingNote
    )
    );
    setNoteToEdit(null);
    }}
    />
    )}

## B.3 User Authentication

1. npm i bcrypt
2. npm i -D @types/bcrypt
3. Create a userSchema in models
4. Create usersRoutes.ts
5. Create UserContoller.ts
6. in app.ts, app.use('/api/users', usersRoutes);
