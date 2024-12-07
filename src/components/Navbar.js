import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold">News App</h1>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/" className="hover:underline">
              Indonesia
            </Link>
          </li>
          <li>
            <Link to="/programming" className="hover:underline">
              Programming
            </Link>
          </li>
          <li>
            <Link to="/saved" className="hover:underline">
              Saved
            </Link>
          </li>
          <li>
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 rounded-l-lg focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-r-lg text-white"
              >
                Search
              </button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;