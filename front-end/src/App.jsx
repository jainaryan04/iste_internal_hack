import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Catalogue from './Components/Catalogue';
import Login from './Components/Login';
import AddOption from './Components/AddOption';
import LandingPage from './Components/LandingPage'

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetch('/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data.message))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="App">
      <Navbar email={isLoggedIn ? userEmail : ''} />
      <LandingPage />
      {isLoggedIn ? (
        userRole === 'B' ? (
          <Catalogue />
        ) : (
          <AddOption email={userEmail} />
        )
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} setUserRole={setUserRole} />
      )}
    </div>
  );
}

export default App;
