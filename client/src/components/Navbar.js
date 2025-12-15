import React, { useContext, useState } from 'react'; // 1. Import useState
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from './Button'; 
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 2. State for the hamburger menu
  const [click, setClick] = useState(false);

  // 3. Toggle the menu click
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu(); // Close menu on logout
    navigate('/login');
  };

  const handleDashboardClick = () => {
    closeMobileMenu(); // Close menu on click
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

        {/* 4. The Hamburger Icon (Visible only on mobile via CSS) */}
        <div className="menu-icon" onClick={handleClick}>
           {/* Uses FontAwesome classes, or you can use text ☰ / ✖ */}
           <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        {/* 5. Add 'active' class if menu is clicked */}
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

          {/* 6. Mobile View: Show Login/Dashboard buttons INSIDE the list on small screens if you prefer, 
               but for now we keep them separate or you can hide them via CSS on mobile */}
        </ul>

        <div className="nav-button-container">
          {user ? (
            <>
              <span className="welcome-text">Hi, {user.username.split(' ')[0]}</span>
              <Button onClick={handleDashboardClick}>Dashboard</Button>
              <button className="logout-link-btn" onClick={handleLogout}>
                Logout
              </button>
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