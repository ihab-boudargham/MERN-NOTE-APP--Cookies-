import { Container } from 'react-bootstrap';
import NotesLoggedInPageView from '../components/form/NotesLoggedInPageView';
import NotesPageLogOutView from '../components/NotesPageLogOutView';
import { User } from '../models/user';

interface NotesPageProps {
  loggedInUser: User | null;
}
const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container>
      <>{loggedInUser ? <NotesLoggedInPageView /> : <NotesPageLogOutView />}</>
    </Container>
  );
};

export default NotesPage;
