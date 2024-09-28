const apiKey = 'f3e6ffebe13a6082e65b15128d0d19f4';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const type = urlParams.get('type');

// Fetch movie/TV show details
fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&append_to_response=credits,videos`)
    .then(response => response.json())
    .then(data => {
        const title = data.title || data.name;
        const rating = data.vote_average;
        const cast = data.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
        const description = data.overview;
        const posterPath = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

        document.getElementById('title').textContent = title;
        document.getElementById('rating').textContent = rating;
        document.getElementById('cast').textContent = cast;
        document.getElementById('description').textContent = description;
        document.getElementById('poster').src = posterPath;

        // Display trailer
        const trailer = data.videos.results.find(video => video.type === 'Trailer');
        if (trailer) {
            document.getElementById('trailer').innerHTML = `<div class="embed-responsive embed-responsive-16by9"><iframe width="560" height="315"  class="embed-responsive-item" src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe></div>`;
        }

        // Display latest episode for TV shows
        if (type === 'tv' && data.last_episode_to_air) {
            const episode = data.last_episode_to_air;
            document.getElementById('latestEpisode').innerHTML = `
                <h5>Latest Episode:</h5>
                <p><strong>Season:</strong> ${episode.season_number}, <strong>Episode:</strong> ${episode.episode_number}, <strong>Air Date:</strong> ${episode.air_date}</p>
                <p>${episode.overview}</p>`;
        }
    });

// Watchlist Management
function addToWatchlist(id, type, title) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const exists = watchlist.some(item => item.id === id && item.type === type);

    if (!exists) {
        watchlist.push({ id, type, title });
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert(`${title} added to watchlist!`);
    } else {
        alert(`${title} is already in your watchlist.`);
    }
}

const tmdbId = data.id;  // TMDB ID from API response

const watchNowButton = `<a href="player.html?type=${type}&id=${tmdbId}" class="btn btn-primary mt-3">Watch Now</a>`;
document.getElementById('latestEpisode').innerHTML += watchNowButton;

