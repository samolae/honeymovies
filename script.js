// sidebar
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".list-item").forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelectorAll(".list-item")
        .forEach((li) => li.classList.remove("active"));
      item.classList.add("active");
    });
  });
});

//
const apiKey = "e828ad33";

// DOM elements
const searchInput = document.getElementById("movie-search");
const movieContainer = document.getElementById("movie-container");

//create a movie div element
function createMovieDiv(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");
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
    const response = await fetch(
      `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
    );
    const searchData = await response.json();

    if (searchData.Response === "True") {
      movieContainer.innerHTML = "";

      //   check search results
      console.log(searchData);

      searchData.Search.forEach((movie) => {
        const movieDiv = createMovieDiv(movie);
        movieContainer.appendChild(movieDiv);
        movieDiv.addEventListener("click", () =>
          fetchMovieDetails(movie.imdbID)
        );
      });
    } else if (searchData.Response === "False") {
      movieContainer.innerHTML = `<span style="color: gray">No movies found that match: ${query}</span>`;
    }
  } catch (error) {
    movieContainer.innerHTML = `<p>Error fetching movie data: ${error.message}</p>`;
    console.error("Error fetching movie data:", error.message);
  }
}
searchInput.addEventListener(
  "input",
  () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      fetchMoviesBySearch(query);
    } else {
      movieContainer.innerHTML = "";
    }
  },
  500
);

console.log(movieDiv);

//
async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
    );
    const movieFullData = await response.json();

    if (movieFullData.Response === "True") {
      console.log(movieFullData);
      // window.location.href = `movie-details.html?imdbID=${imdbID}`;
      const detailsTab = window.open("movie_details.html", "_blank");

      detailsTab.onload = function () {
        console.log("shevida");
        const movieDetails =
          detailsTab.document.getElementById("movie-details");
        console.log(movieDetails);
        movieDetails.innerHTML = `
              <div>
                <div class="info">
                  <h3>${movieFullData.Title}</h3>
                  <div>Rating: ${movieFullData.imdbRating}</div>
                  <span>Views: N/A (Data not available through OMDb API)</span>
                  <a href="http://www.imdb.com/title/${movieFullData.imdbID}/">imdb logo da link</a>
                  <p>${movieFullData.Plot}</p>
                  <div>
                    <button class="second-btn">Watchlist</button>
                    <button class="second-btn">Watch Now</button>
                  </div>
                </div>
                <div class="image-container">     <img src="${movieFullData.Poster}" alt="${movieFullData.Title}">
                </div></div>
              </div>
            `;
      };
    } else {
      movieContainer.innerHTML = `<p>Error fetching movie data: ${movieFullData.Error}</p>`;
      console.log("Error fetching movie data:", movieFullData.Error);
    }
  } catch (error) {
    movieContainer.innerHTML = `<p>Error fetching movie data: ${error.message}</p>`;
    console.log("Error fetching movie data:", error.message);
  }
}
