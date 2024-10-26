import React, { useEffect } from 'react';

interface NavBarProps {
  setCurrentPage: (page: string) => void; 
  currentPage: string;
}

const NavBar: React.FC<NavBarProps> = ({ setCurrentPage, currentPage }) => {

  useEffect(() => {
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;
    const label = document.getElementById('label');
    
    const handleThemeChange = () => {
      document.body.classList.toggle('dark');
      label?.classList.toggle('dark');
    };

    checkbox?.addEventListener('change', handleThemeChange);
    
    return () => {
      checkbox?.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button
            className={`navbar-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentPage('about')}
          >
            About
          </button>
        </li>
        <li className="navbar-item">
          <button
            className={`navbar-link ${currentPage === 'resume' ? 'active' : ''}`}
            onClick={() => setCurrentPage('resume')}
          >
            Resume
          </button>
        </li>
        <li className="navbar-item">
          <button
            className={`navbar-link ${currentPage === 'blog' ? 'active' : ''}`}
            onClick={() => setCurrentPage('blog')}
          >
            Blog
          </button>
        </li>
        <li className="navbar-item">
          <button
            className={`navbar-link ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => setCurrentPage('contact')}
          >
            Contact
          </button>
        </li>
        <li className="navbar-item moode">
          <div id="dark">
            <input id="checkbox" type="checkbox" className="checkbox" />
            <label id="label" htmlFor="checkbox" className="label">
              <img
                className="sun"
                src="https://media2.giphy.com/media/eLda0PscFqXLvJgHRI/200w.webp?cid=ecf05e47ci254r528gu6g1nk45slza8ie5dtb6zzf8gwycyt&rid=200w.webp&ct=s"
                alt="Enable Light Mode"
              />
              <img
                className="moon"
                src="https://media4.giphy.com/media/pN2KlTp0C82WFxa5QU/200w.webp?cid=ecf05e47lz3txn5x0t4wlsfehs1x4ovel1o44k37cn8xnj3w&rid=200w.webp&ct=s"
                alt="Enable Dark Mode"
              />
              <div id="ball" className="ball"></div>
            </label>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
