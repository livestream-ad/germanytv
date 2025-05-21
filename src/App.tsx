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
              <p>Deutsche Fernsehsender jetzt kostenlos und ohne Anmeldung online sehen. ARD, ZDF, RTL, ProSieben, Sat.1 und viele mehr – im Live Stream!</p>
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
                <span><i className="fas fa-envelope"></i> <a href="mailto:info@livestream.ad" className="email">info@livestream.ad</a></span>
              </div>
              <div className="socials">
                <a href="https://www.facebook.com/" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                <a href="https://www.twitter.com/" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
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
