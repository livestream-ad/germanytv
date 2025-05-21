import React from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <a href="https://www.livestream.ad/" title="Live TV Kostenlos – Deutsche Sender Online">
            <h1>LiveStream</h1>
          </a>
        </div>
        <div className="menu-toggle" id="mobile-menu">
          <i className="fas fa-bars"></i>
        </div>
        <nav className="nav">
          <div className="close-menu" id="close-menu">
            <i className="fas fa-times"></i>
          </div>
          <ul>
            <li><a href="https://www.livestream.ad/kategorien" title="Kategorien">Kategorien</a></li>
            <li><a href="https://www.livestream.ad/tv-programm" title="Tv-Programm">Tv-Programm</a></li>
            <li><a href="https://www.livestream.ad/blog" title="Blog">Blog</a></li>
            <li><a href="https://www.livestream.ad/kontakt" title="Kontakt">Kontakt</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; 