
// Sidebar menu  
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".list-item").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".list-item").forEach((element) => {
        element.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
});







// DOM elements
const searchInput = document.getElementById("movie-search");
const movieContainer = document.getElementById("movie-container");

// API key
const apiKey = "e828ad33";

//  movie container after searching
const createMovieDiv = (movie) => {
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");
  movieDiv.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}">
    <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
    </div>`;
  return movieDiv;
};


const fetchMovieBySearch = async (query) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
    );
    const searchData = await response.json();

    if (searchData.Response === "True") {
      console.log(searchData);
      movieContainer.innerHTML = "";
      searchData.Search.forEach((movie) => {
        const movieDiv = createMovieDiv(movie);
        movieContainer.appendChild(movieDiv);

        movieDiv.addEventListener("click", () => {
          openOrFocusDetailsTab(movie.imdbID);
        });
      });
    } else if (searchData.Response === "False") {
      movieContainer.innerHTML = `<span style="color: gray">No movies found that match: ${query}</span>`;
    }
  } catch (error) {
    console.log("Error fetching movie data:", error.message, error);
  }
};

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    fetchMovieBySearch(query);
  } else {
    movieContainer.innerHTML = "";
  }
}, 500);

// funtion for checking if details Tabs are or not
let detailsTab;
const openOrFocusDetailsTab = (imdbID) => {
  if (detailsTab && !detailsTab.closed) {
    detailsTab.location.href = `movie_details.html?imdbID=${imdbID}`;
    detailsTab.focus();
  } else {
    detailsTab = window.open(`movie_details.html?imdbID=${imdbID}`, "_blank");
  }
};
