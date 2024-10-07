import React from 'react';

interface NavBarProps {
  setCurrentPage: (page: string) => void; 
  currentPage: string;
}

const NavBar: React.FC<NavBarProps> = ({ setCurrentPage, currentPage }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button
            className={`navbar-link ${currentPage === 'about' ? 'active' : ''}`}
            data-nav-link
            onClick={() => setCurrentPage('about')}
          >
            About
          </button>
        </li>
        <li className="navbar-item">
          <button
            className={`navbar-link ${currentPage === 'resume' ? 'active' : ''}`}
            data-nav-link
            onClick={() => setCurrentPage('resume')}
          >
            Resume
          </button>
        </li>
        <li className="navbar-item">
          <button
            className={`navbar-link ${currentPage === 'blog' ? 'active' : ''}`} // Changed to 'blog' for consistency
            data-nav-link
            onClick={() => setCurrentPage('blog')}
          >
            Blog
          </button>
        </li>
        <li className="navbar-item">
          <button
            className={`navbar-link ${currentPage === 'contact' ? 'active' : ''}`}
            data-nav-link
            onClick={() => setCurrentPage('contact')}
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
