import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from './Button'; 
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate('/login');
  };

  const handleDashboardClick = () => {
    closeMobileMenu();
    if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Shyam Fin
        </Link>

        {/* ✅ FIX: Using text symbols instead of FontAwesome icons */}
        <div className="menu-icon" onClick={handleClick}>
           <span style={{ color: 'white', fontSize: '1.8rem', cursor: 'pointer' }}>
             {click ? '✕' : '☰'} 
           </span>
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/loans" className="nav-links" onClick={closeMobileMenu}>Loans</Link>
          </li>
          <li className="nav-item">
            <Link to="/investments" className="nav-links" onClick={closeMobileMenu}>Investments</Link>
          </li>
          
          {user?.role !== 'admin' && (
             <li className="nav-item">
               <Link to="/apply" className="nav-links" onClick={closeMobileMenu} style={{color: '#28a745', fontWeight: 'bold'}}>
                 Apply Now
               </Link>
             </li>
          )}

          {/* Mobile Buttons */}
          <li className="nav-item-mobile">
            {user ? (
               <div className="mobile-auth-buttons">
                  <button className="nav-links-mobile" onClick={handleDashboardClick}>Dashboard</button>
                  <button className="nav-links-mobile logout" onClick={handleLogout}>Logout</button>
               </div>
            ) : (
               <div className="mobile-auth-buttons">
                  <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}>Login</Link>
                  <Link to="/register" className="nav-links-mobile register" onClick={closeMobileMenu}>Register</Link>
               </div>
            )}
          </li>
        </ul>

        {/* Desktop Buttons (Hidden on Mobile) */}
        <div className="nav-button-container">
          {user ? (
            <>
              <span className="welcome-text">Hi, {user.username.split(' ')[0]}</span>
              <Button onClick={handleDashboardClick}>Dashboard</Button>
              <button className="logout-link-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
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