// Function to load and display watchlist
function loadWatchlist() {
    const watchlistItems = document.getElementById('watchlistItems');
    watchlistItems.innerHTML = '';

    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.forEach(item => {
        const watchlistCard = createWatchlistCard(item);
        watchlistItems.appendChild(watchlistCard);
    });
}

// Function to create a card for watchlist item
function createWatchlistCard(item) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-3 mb-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card bg-dark text-light';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    img.alt = item.title || item.name;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = item.title || item.name;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-danger btn-block';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeFromWatchlist(item);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(removeBtn);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    return colDiv;
}

// Function to remove item from watchlist
function removeFromWatchlist(item) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(w => w.id !== item.id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    loadWatchlist();
}

// Load watchlist when page loads
loadWatchlist();
