// sidebar
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.list-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.list-item').forEach(li => li.classList.remove('active'));
            item.classList.add('active');
        });
    });
});



// 
const apiKey = 'e828ad33';

// DOM elements
const searchInput = document.getElementById('movie-search');
const movieContainer = document.getElementById('movie-container');

//create a movie div element
function createMovieDiv(movie) {
  const movieDiv = document.createElement('div');
  movieDiv.classList.add('movie');
  movieDiv.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}">
    <div class="movie-info">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
    </div>
  `;
  return movieDiv;
}

// function onMovieClick(imdbID) {
//     console.log(imdbID);
//   window.open(`movie-details.html?imdbID=${imdbID}`, '_blank');
// }

async function fetchMoviesBySearch(query) {
  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
    const searchData = await response.json();

    if (searchData.Response === 'True') {
      movieContainer.innerHTML = '';

    //   check search results
      console.log(searchData);


      searchData.Search.forEach(movie => {
        const movieDiv = createMovieDiv(movie);
        movieContainer.appendChild(movieDiv);
        movieDiv.addEventListener('click', () => onMovieClick(movie.imdbID));
      });
    } else if (searchData.Response === 'False') {
      movieContainer.innerHTML = `<span style="color: gray">No movies found that match: ${query}</span>`;
    }
  } catch (error) {
    movieContainer.innerHTML = `<p>Error fetching movie data: ${error.message}</p>`;
    console.error('Error fetching movie data:', error.message);
  }
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchMoviesBySearch(query);
    } else {
      movieContainer.innerHTML = '';
    }
  });