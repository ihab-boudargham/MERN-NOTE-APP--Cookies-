import React, { useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';

function App() {
  const [clickCount, setClickCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button onClick={() => setClickCount(clickCount + 1)}>
          Clicked {clickCount} times.
        </Button>
      </header>
    </div>
  );
}

export default App;
