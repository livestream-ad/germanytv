import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesSection, setFavoritesSection] = useState<HTMLElement | null>(null);
  const [favoriteChannels, setFavoriteChannels] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Favoriten aus dem localStorage laden
    const savedFavorites = localStorage.getItem('favoriteChannels');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const favSection = document.getElementById('favoritesSection');
    const favChannels = document.getElementById('favoriteChannels');
    setFavoritesSection(favSection);
    setFavoriteChannels(favChannels);

    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        const target = e.currentTarget as HTMLButtonElement;
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        
        const category = target.getAttribute('data-category');
        const channelCards = document.querySelectorAll('.channel-card');
        
        channelCards.forEach(card => {
          if (category === 'all' || (card as HTMLElement).getAttribute('data-category') === category) {
            (card as HTMLElement).style.display = 'block';
          } else {
            (card as HTMLElement).style.display = 'none';
          }
        });
      });
    });

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchButton) {
      searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          performSearch();
        }
      });
    }

    function performSearch() {
      const searchTerm = (searchInput as HTMLInputElement)?.value.toLowerCase() || '';
      const channelCards = document.querySelectorAll('.channel-card');
      
      channelCards.forEach(card => {
        const channelName = card.querySelector('h4')?.textContent?.toLowerCase() || '';
        
        if (channelName.includes(searchTerm)) {
          (card as HTMLElement).style.display = 'block';
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateFavoriteButtons();
    updateFavoriteSection();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  const toggleFavorite = (channelId: string) => {
    const newFavorites = favorites.includes(channelId)
      ? favorites.filter(id => id !== channelId)
      : [...favorites, channelId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteChannels', JSON.stringify(newFavorites));
  };

  const updateFavoriteButtons = () => {
    const favButtons = document.querySelectorAll('.fav-btn');
    favButtons.forEach(button => {
      const channelId = (button as HTMLElement).getAttribute('data-id');
      const icon = button.querySelector('i');
      
      if (icon) {
        if (favorites.includes(channelId || '')) {
          icon.classList.remove('far');
          icon.classList.add('fas');
        } else {
          icon.classList.remove('fas');
          icon.classList.add('far');
        }
      }
    });
  };

  const updateFavoriteSection = () => {
    if (!favoriteChannels || !favoritesSection) return;
    
    favoriteChannels.innerHTML = '';
    
    if (favorites.length === 0) {
      favoritesSection.style.display = 'none';
      return;
    }
    
    favoritesSection.style.display = 'block';
    
    favorites.forEach(channelId => {
      const originalCard = document.querySelector(`.channel-card[data-id="${channelId}"]`);
      
      if (originalCard) {
        const cardClone = originalCard.cloneNode(true) as HTMLElement;
        favoriteChannels.appendChild(cardClone);
        
        const button = cardClone.querySelector('.fav-btn');
        if (button) {
          button.addEventListener('click', () => {
            toggleFavorite(channelId);
          });
        }
      }
    });
  };

  return (
    <div className="content">
      <div className="container">
        <div className="filter-container">
          <div className="search-box">
            <input type="text" id="searchInput" placeholder="Sender suchen..." />
            <button id="searchButton"><i className="fas fa-search"></i></button>
          </div>
          <div className="category-buttons">
            <button className="category-btn active" data-category="all">Alle</button>
            <button className="category-btn" data-category="3">National</button>
            <button className="category-btn" data-category="4">Nachrichten</button>
            <button className="category-btn" data-category="5">Kultur & Doku</button>
            <button className="category-btn" data-category="6">Unterhaltung & Reality</button>
            <button className="category-btn" data-category="9">Sport</button>
          </div>
        </div>
        
        <div className="channels-wrapper">
          <div className="favorites-section" id="favoritesSection">
            <h3>Favoriten</h3>
            <div className="channels-grid" id="favoriteChannels">
            </div>
          </div>
          
          <div className="all-channels-section">
            <h3>Live-TV-Sender</h3>
            <div className="channels-grid" id="allChannels">
              <div className="channel-card" data-id="1" data-category="3">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/ard-live" title="ARD">
                    <img src="https://www.livestream.ad/images/ard-live.png" alt="ARD" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/ard-live" title="ARD">ARD</a></h4>
                  <p className="current-show">ARD LiveStream</p>
                  <button className="fav-btn" data-id="1" onClick={() => toggleFavorite("1")}>
                    <i className={`${favorites.includes("1") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="8" data-category="4">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/rtl-live" title="RTL">
                    <img src="https://www.livestream.ad/images/rtl-live.png" alt="RTL" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/rtl-live" title="RTL">RTL</a></h4>
                  <p className="current-show">RTL LiveStream</p>
                  <button className="fav-btn" data-id="8" onClick={() => toggleFavorite("8")}>
                    <i className={`${favorites.includes("8") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="15" data-category="3">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/zdf-live" title="ZDF">
                    <img src="https://www.livestream.ad/images/zdf-live.png" alt="ZDF" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/zdf-live" title="ZDF">ZDF</a></h4>
                  <p className="current-show">ZDF LiveStream</p>
                  <button className="fav-btn" data-id="15" onClick={() => toggleFavorite("15")}>
                    <i className={`${favorites.includes("15") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="16" data-category="3">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/sat1-live" title="Sat.1">
                    <img src="https://www.livestream.ad/images/sat1-live.png" alt="Sat.1" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/sat1-live" title="Sat.1">Sat.1</a></h4>
                  <p className="current-show">Sat.1 LiveStream</p>
                  <button className="fav-btn" data-id="16" onClick={() => toggleFavorite("16")}>
                    <i className={`${favorites.includes("16") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="17" data-category="3">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/prosieben-live" title="ProSieben">
                    <img src="https://www.livestream.ad/images/prosieben-live.png" alt="ProSieben" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/prosieben-live" title="ProSieben">ProSieben</a></h4>
                  <p className="current-show">ProSieben LiveStream</p>
                  <button className="fav-btn" data-id="17" onClick={() => toggleFavorite("17")}>
                    <i className={`${favorites.includes("17") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="18" data-category="3">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/vox-live" title="Vox">
                    <img src="https://www.livestream.ad/images/vox-live.png" alt="Vox" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/vox-live" title="Vox">Vox</a></h4>
                  <p className="current-show">Vox LiveStream</p>
                  <button className="fav-btn" data-id="18" onClick={() => toggleFavorite("18")}>
                    <i className={`${favorites.includes("18") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="19" data-category="3">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/kabel-1-live" title="Kabel 1">
                    <img src="https://www.livestream.ad/images/kabel-1-live.png" alt="Kabel 1" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/kabel-1-live" title="Kabel 1">Kabel 1</a></h4>
                  <p className="current-show">Kabel 1 LiveStream</p>
                  <button className="fav-btn" data-id="19" onClick={() => toggleFavorite("19")}>
                    <i className={`${favorites.includes("19") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="20" data-category="5">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/3sat-live" title="3Sat">
                    <img src="https://www.livestream.ad/images/3sat-live.png" alt="3Sat" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/3sat-live" title="3Sat">3Sat</a></h4>
                  <p className="current-show">3Sat LiveStream</p>
                  <button className="fav-btn" data-id="20" onClick={() => toggleFavorite("20")}>
                    <i className={`${favorites.includes("20") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="24" data-category="4">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/n24-live" title="N24">
                    <img src="https://www.livestream.ad/images/n24-live.png" alt="N24" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/n24-live" title="N24">N24</a></h4>
                  <p className="current-show">N24 LiveStream</p>
                  <button className="fav-btn" data-id="24" onClick={() => toggleFavorite("24")}>
                    <i className={`${favorites.includes("24") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="21" data-category="5">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/d-max-live" title="D Max">
                    <img src="https://www.livestream.ad/images/d-max-live.png" alt="D Max" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/d-max-live" title="D Max">D Max</a></h4>
                  <p className="current-show">D Max LiveStream</p>
                  <button className="fav-btn" data-id="21" onClick={() => toggleFavorite("21")}>
                    <i className={`${favorites.includes("21") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="22" data-category="6">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/rtl2-live" title="RTL2">
                    <img src="https://www.livestream.ad/images/rtl2-live.png" alt="RTL2" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/rtl2-live" title="RTL2">RTL2</a></h4>
                  <p className="current-show">RTL2 LiveStream</p>
                  <button className="fav-btn" data-id="22" onClick={() => toggleFavorite("22")}>
                    <i className={`${favorites.includes("22") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="23" data-category="4">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/ntv-live" title="NTV">
                    <img src="https://www.livestream.ad/images/ntv-live.png" alt="NTV" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/ntv-live" title="NTV">NTV</a></h4>
                  <p className="current-show">NTV LiveStream</p>
                  <button className="fav-btn" data-id="23" onClick={() => toggleFavorite("23")}>
                    <i className={`${favorites.includes("23") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="channel-card" data-id="25" data-category="3">
                <div className="channel-logo">
                  <a href="https://www.livestream.ad/zdfneo-live" title="ZDFNeo">
                    <img src="https://www.livestream.ad/images/zdfneo-live.png" alt="ZDFNeo" />
                  </a>
                </div>
                <div className="channel-info">
                  <h4><a href="https://www.livestream.ad/zdfneo-live" title="ZDFNeo">ZDFNeo</a></h4>
                  <p className="current-show">ZDFNeo LiveStream</p>
                  <button className="fav-btn" data-id="25" onClick={() => toggleFavorite("25")}>
                    <i className={`${favorites.includes("25") ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;