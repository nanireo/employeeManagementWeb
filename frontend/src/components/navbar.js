import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username') || localStorage.getItem('username');

   // Retrieve the sessionId from local storage
   const sessionId = localStorage.getItem('sessionId');
   console.log('Session ID:', sessionId);

  const handleLogout = () => {

  // Retrieve the sessionId from local storage
    const sessionId = localStorage.getItem('sessionId');
    console.log('Session ID:', sessionId);
    // Remove the session ID from local storage
    localStorage.removeItem('sessionId');

    localStorage.removeItem('username');

    window.location.href = '/';
  };

  return (
    <ul className="navbar-ul">
        <li className="navbar-list-item" style={{ marginLeft: 'auto' }}>
        <Link to="/Dashboard"><button className="navbar-button">Home</button></Link>
        </li>
        <li className="navbar-list-item">
        <Link to="/EmployeeListPages"><button className="navbar-button">Employee List</button></Link>
        </li>     
        {username && (
        <li className="navbar-list-item">
          <span className="navbar-username">{username}</span>
          <button className="navbar-logout-button" onClick={handleLogout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
