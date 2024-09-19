import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); 
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          Mern Task
        </div>
        <ul className="flex space-x-6 text-white">
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            {user ? <Link to='/employee-list'>Employee List</Link> : <></>} 
          </li>
          <li>
            {user ? user.name : 'Guest'}
          </li>
          <li>
            {user ? (
              <button 
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Logout
              </button>
            ) : (
              <Link 
                to='/login'
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
