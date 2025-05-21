// Wird ausgeführt, wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menü-Funktionalität
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');
  const nav = document.querySelector('.nav');
  const overlay = document.getElementById('overlay');

  if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
      nav.classList.add('active');
      overlay.style.display = 'block';
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener('click', function() {
      nav.classList.remove('active');
      overlay.style.display = 'none';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function() {
      nav.classList.remove('active');
      overlay.style.display = 'none';
    });
  }

  // Kategorie-Filterung
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Entferne die aktive Klasse
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Füge die aktive Klasse zum angeklickten Button hinzu
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      
      // Filtere die Kanäle
      const channelCards = document.querySelectorAll('.channel-card');
      
      channelCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Suchfunktion
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  
  if (searchButton && searchInput) {
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
    const searchTerm = searchInput.value.toLowerCase();
    const channelCards = document.querySelectorAll('.channel-card');
    
    channelCards.forEach(card => {
      const channelName = card.querySelector('h4').textContent.toLowerCase();
      
      if (channelName.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Funktionalität der Favoriten-Buttons
  const favButtons = document.querySelectorAll('.fav-btn');
  const favoriteChannels = document.getElementById('favoriteChannels');
  const favSection = document.getElementById('favoritesSection');
  
  // Lade Favoritenkanäle aus dem localStorage
  let favorites = [];
  if (localStorage.getItem('favoriteChannels')) {
    favorites = JSON.parse(localStorage.getItem('favoriteChannels'));
  }
  
  // Aktualisiere die Favoriten-Icons
  updateFavoriteIcons();
  
  // Zeige die Favoritenkanäle an
  updateFavoriteSection();
  
  // Füge Klick-Event zu den Favoriten-Buttons hinzu
  favButtons.forEach(button => {
    button.addEventListener('click', function() {
      const channelId = this.getAttribute('data-id');
      
      // Füge zu Favoriten hinzu oder entferne
      if (favorites.includes(channelId)) {
        favorites = favorites.filter(id => id !== channelId);
      } else {
        favorites.push(channelId);
      }
      
      // Speichere im localStorage
      localStorage.setItem('favoriteChannels', JSON.stringify(favorites));
      
      // Aktualisiere die Favoriten-Icons
      updateFavoriteIcons();
      
      // Zeige die Favoritenkanäle an
      updateFavoriteSection();
    });
  });
  
  function updateFavoriteIcons() {
    favButtons.forEach(button => {
      const channelId = button.getAttribute('data-id');
      const icon = button.querySelector('i');
      
      if (favorites.includes(channelId)) {
        icon.classList.remove('far');
        icon.classList.add('fas');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    });
  }
  
  function updateFavoriteSection() {
    if (favoriteChannels && favSection) {
      // Leere den Favoritenbereich
      favoriteChannels.innerHTML = '';
      
      if (favorites.length === 0) {
        // Wenn keine Favoriten, verstecke den Abschnitt
        favSection.style.display = 'none';
        return;
      }
      
      // Wenn Favoriten vorhanden sind, zeige den Abschnitt an
      favSection.style.display = 'block';
      
      // Kopiere für jeden Favoriten die Kanal-Karte und füge sie zum Favoritenbereich hinzu
      favorites.forEach(channelId => {
        const originalCard = document.querySelector(`.channel-card[data-id="${channelId}"]`);
        
        if (originalCard) {
          const cardClone = originalCard.cloneNode(true);
          favoriteChannels.appendChild(cardClone);
          
          // Füge Klick-Event zur klonierten Karte hinzu
          const favButton = cardClone.querySelector('.fav-btn');
          
          favButton.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            
            // Entferne aus Favoriten
            favorites = favorites.filter(i => i !== id);
            
            // Speichere im localStorage
            localStorage.setItem('favoriteChannels', JSON.stringify(favorites));
            
            // Aktualisiere die Favoriten-Icons
            updateFavoriteIcons();
            
            // Zeige die Favoritenkanäle erneut an
            updateFavoriteSection();
          });
        }
      });
    }
  }
}); 