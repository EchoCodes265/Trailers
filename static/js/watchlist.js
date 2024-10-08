// Function to load and display watchlist
function loadWatchlist() {
  const watchlistGrid = document.getElementById("watchlistGrid");
  watchlistGrid.innerHTML = "";

  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist.forEach((item) => {
    const watchlistCard = createWatchlistCard(item);
    watchlistGrid.appendChild(watchlistCard);
  });
}

// Function to create a card for watchlist item
function createWatchlistCard(item) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card bg-dark text-light h-100";

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  img.alt = item.title || item.name;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = item.title || item.name;

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "mt-auto";

  const removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-danger btn-sm me-2";
  removeBtn.innerHTML = '<i class="bi bi-trash"></i> Remove';
  removeBtn.onclick = () => removeFromWatchlist(item);

  const detailsButton = document.createElement("button");
  detailsButton.className = "btn btn-success btn-sm";
  detailsButton.innerHTML = '<i class="bi bi-info-circle"></i> Details';
  detailsButton.onclick = () => showDetails(item.id, item.type);

  buttonGroup.appendChild(removeBtn);
  buttonGroup.appendChild(detailsButton);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(buttonGroup);
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  colDiv.appendChild(cardDiv);

  return colDiv;
}

// Function to remove item from watchlist
function removeFromWatchlist(item) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist = watchlist.filter((w) => w.id !== item.id);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  loadWatchlist();
}

// Function to show details of a watchlist item
function showDetails(id, type) {
  window.location.href = `/details?id=${id}&type=${type}`;
}

// Load watchlist when page loads
loadWatchlist();
