import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// FIX 1: Use '../' instead of '../../' because Navbar.js is directly in components/
import { AuthContext } from '../context/AuthContext';

// FIX 2: Use './Button' because Button.js is in the SAME folder as Navbar.js
import Button from './Button'; 

import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDashboardClick = () => {
    if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Shyam Fin
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/loans" className="nav-links">Loans</Link>
          </li>
          <li className="nav-item">
            <Link to="/investments" className="nav-links">Investments</Link>
          </li>
          {/* Only show Apply link if user is NOT admin */}
          {user?.role !== 'admin' && (
             <li className="nav-item">
               <Link to="/apply" className="nav-links" style={{color: '#28a745', fontWeight: 'bold'}}>
                 Apply Now
               </Link>
             </li>
          )}
        </ul>

        <div className="nav-button-container">
          {user ? (
            // --- LOGGED IN VIEW ---
            <>
              <span className="welcome-text">Hi, {user.username.split(' ')[0]}</span>
              <Button onClick={handleDashboardClick}>Dashboard</Button>
              <button className="logout-link-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            // --- LOGGED OUT VIEW ---
            <>
              <Link to="/login" className="nav-btn-link">
                <Button>Login</Button>
              </Link>
              <Link to="/register" className="nav-btn-link">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;