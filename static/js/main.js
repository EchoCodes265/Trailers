const apiKey = "f3e6ffebe13a6082e65b15128d0d19f4";
let currentPage = 1;

// Function to get trending movies
async function getTrendingMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${currentPage}`
  );
  const data = await response.json();
  displayMovies(data.results);
}

// Function to get trending TV shows
async function getTrendingTVShows() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&page=${currentPage}`
  );
  const data = await response.json();
  displayTVShows(data.results);
}

// Event listeners for switching between movies and TV shows
const moviesTab = document.getElementById("movies-tab");
const tvShowsTab = document.getElementById("tvshows-tab");
const moviesContent = document.getElementById("movies");
const tvShowsContent = document.getElementById("tvshows");

moviesTab.addEventListener("click", () => {
  moviesContent.classList.add("show", "active");
  tvShowsContent.classList.remove("show", "active");
  currentPage = 1;
  getTrendingMovies();
  window.scrollTo(0, 0);
});

tvShowsTab.addEventListener("click", () => {
  tvShowsContent.classList.add("show", "active");
  moviesContent.classList.remove("show", "active");
  currentPage = 1;
  getTrendingTVShows();
  window.scrollTo(0, 0);
});

// Function to display movies in the DOM
function displayMovies(movies) {
  const moviesList = document.getElementById("moviesList");
  moviesList.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = createMediaCard(movie, "movie");
    moviesList.appendChild(movieCard);
  });
}

// Function to display TV shows in the DOM
function displayTVShows(tvShows) {
  const tvShowsList = document.getElementById("tvShowsList");
  tvShowsList.innerHTML = "";
  tvShows.forEach((tvShow) => {
    const tvShowCard = createMediaCard(tvShow, "tv");
    tvShowsList.appendChild(tvShowCard);
  });
}

// Function to create a media card (movie or TV show)
function createMediaCard(media, type) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card bg-dark text-light h-100";

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = `https://image.tmdb.org/t/p/w500${media.poster_path}`;
  img.alt = media.title || media.name;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = media.title || media.name;

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "mt-auto";

  const addToWatchlistBtn = document.createElement("button");
  addToWatchlistBtn.className = "btn btn-primary btn-sm me-2";
  addToWatchlistBtn.innerHTML =
    '<i class="bi bi-bookmark-plus"></i> Add to Watchlist';
  addToWatchlistBtn.onclick = () => addToWatchlist(media, type);

  const detailsButton = document.createElement("button");
  detailsButton.className = "btn btn-success btn-sm";
  detailsButton.innerHTML = '<i class="bi bi-info-circle"></i> Details';
  detailsButton.onclick = () => showDetails(media.id, type);

  buttonGroup.appendChild(addToWatchlistBtn);
  buttonGroup.appendChild(detailsButton);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(buttonGroup);
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  colDiv.appendChild(cardDiv);

  return colDiv;
}

function showDetails(id, type) {
  window.location.href = `/details?id=${id}&type=${type}`;
}

// Function to add media to watchlist using localStorage
function addToWatchlist(media, type) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const exists = watchlist.some(
    (item) => item.id === media.id && item.type === type
  );

  if (!exists) {
    watchlist.push({ ...media, type });
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert(`${media.title || media.name} added to your watchlist!`);
  } else {
    alert(`${media.title || media.name} is already in your watchlist.`);
  }
}

// Pagination buttons
document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  if (moviesContent.classList.contains("active")) {
    getTrendingMovies();
  } else {
    getTrendingTVShows();
  }
  window.scrollTo(0, 0);
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    if (moviesContent.classList.contains("active")) {
      getTrendingMovies();
    } else {
      getTrendingTVShows();
    }
    window.scrollTo(0, 0);
  }
});

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value;

  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false`
  );
  const movieData = await movieResponse.json();

  const tvResponse = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&include_adult=false`
  );
  const tvData = await tvResponse.json();

  // Clear previous search results
  const moviesList = document.getElementById("moviesList");
  const tvShowsList = document.getElementById("tvShowsList");
  moviesList.innerHTML = "";
  tvShowsList.innerHTML = "";

  // Display movies and TV shows
  displayMovies(movieData.results);
  displayTVShows(tvData.results);

  // Switch to movies tab
  document.getElementById("movies-tab").click();
});

// Initially load movies and TV shows
getTrendingMovies();
getTrendingTVShows();
