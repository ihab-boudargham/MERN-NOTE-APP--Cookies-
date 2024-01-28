import SignUpModal from './components/SignUpModalProps';
import LoginModal from './components/form/LoginModal';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { User } from './models/user';
import * as NotesApi from './network/notes_api';
import NotesLoggedInPageView from './components/form/NotesLoggedInPageView';
import NotesPageLogOutView from './components/NotesPageLogOutView';

function App() {
  // we need a state for the logged in user. we should fetch the user form the backend from the authentication
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLogggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />

      <Container>
        <>
          {loggedInUser ? <NotesLoggedInPageView /> : <NotesPageLogOutView />}
        </>
      </Container>

      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
