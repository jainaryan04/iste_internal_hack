import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsLoggedIn, setUserEmail, setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      setMessage(response.data.message);
      setIsLoggedIn(true);
      setUserEmail(response.data.email);
      setUserRole(response.data.role);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.request) {
        setMessage("No response from server. Please try again later.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#BC9D6E] h-[47.5vh] flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form onSubmit={handleLogin} className="bg-[#7B4926] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#7B4926]" 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-6">
            <input 
              type="password" 
              placeholder="Password" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#7B4926]" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className=" bg-[#BC9D6E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
