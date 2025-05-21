import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section about">
              <h3>LiveStream</h3>
                         </div>
            <div className="footer-section links">
              <h3>Schnellzugriffe</h3>
              <ul>
                <li><a href="https://www.livestream.ad/kategorien" title="Kategorien">Kategorien</a></li>
                <li><a href="https://www.livestream.ad/tv-programm" title="Tv Programm">Tv Programm</a></li>
                <li><a href="https://www.livestream.ad/blog" title="blog">Blog</a></li>
                <li><a href="https://www.livestream.ad/datenschutzrichtlinie" title="Datenschutzrichtlinie">Datenschutzrichtlinie</a></li>
              </ul>
            </div>
            <div className="footer-section contact-form">
              <h3>Kontaktieren Sie uns</h3>
              <div className="contact">
                <span><i className="fas fa-envelope"></i> <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="82eeebf4e7f1f6f0e7e3efe3e6e6c2e5efe3ebeeace1edef">[email&#160;protected]</a></span>
              </div>
              <div className="socials">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 LiveStream. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
      <div className="overlay" id="overlay"></div>
    </div>
  );
}

export default App;
