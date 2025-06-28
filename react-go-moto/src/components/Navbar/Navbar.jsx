import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/gomoto_logo.png';

// You can replace this with an actual user icon or SVG
const UserIcon = () => (
  <svg
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
  </svg>
);

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    useEffect(() => {
    const onStorageChange = () => {
      const savedUser = localStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };
    window.addEventListener('storageChanged', onStorageChange);
    return () => window.removeEventListener('storageChanged', onStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="GoMoto Logo" />
          </Link>
        </div>
        <ul className="nav-links">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/rent-cars">Rent Car</Link></li>
  <li><Link to="/blog">BLOG</Link></li>
  {user ? (
    <li><Link to="/my-rents">My Rents</Link></li>
  ) : (
    <li><Link to="/terms">Terms & Conditions</Link></li>
  )}
  <li><Link to="/contact">Contact Us</Link></li>
</ul>

        <div className="signin-btn">
          {!user ? (
            <Link to="/login">Sign in</Link>
          ) : (
            <div className="user-menu" ref={dropdownRef}>
              <button
                className="user-icon-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="User menu"
              >
                <UserIcon />
              </button>

              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                  <Link to="/user-profile" onClick={() => setDropdownOpen(false)}>
                    Profile
                  </Link>
                  </li>
                  <li>
                    <Link to="/favorites" onClick={() => setDropdownOpen(false)}>
                      Favorites
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="logout-btn"
                      type="button"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
