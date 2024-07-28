import React, { useState } from 'react';
import axios from 'axios';

function Navbar({ email }) {
  const [categories, setCategories] = useState(['Packaged Food', 'Raw Food', 'Partially Cooked Food', 'Completely Cooked Food']);
  const [selectedCity, setSelectedCity] = useState('Select your City');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const cities = ['Thane', 'Delhi', 'Pune'];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-[#BC9D6E] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a href="/">MyLogo</a>
        </div>
        <div className="flex items-center bg-white rounded">
          <input type="text" className="p-2 w-full" placeholder="Search..." />
          <button className="p-2 bg-[#7B4926] text-white rounded-r">Search</button>
        </div>
        <div className="relative">
          <button 
            onClick={toggleDropdown}
            className="text-white bg-[#7B4926] p-2 rounded inline-flex items-center"
          >
            Categories
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
              <ul>
                {categories.map((category, index) => (
                  <li key={index} className="p-2 hover:bg-gray-200">
                    <a href={`/${category.toLowerCase()}`}>{category}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <a href="/todays-deal" className="text-white p-2">Today's Deal</a>
        </div>
        <div className="relative">
          {email ? (
            <div className="text-white p-2" onClick={toggleUserDropdown}>
              Welcome, {email}
              <svg className="ml-2 w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          ) : (
            <a href="/login" className="text-white p-2">Login/Sign Up</a>
          )}
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
              <ul>
                <li className="p-2 hover:bg-gray-200" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
        <div className="text-white p-2">
          <select value={selectedCity} onChange={handleCityChange} className="bg-[#7B4926] p-2 rounded">
            <option>Select your City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
