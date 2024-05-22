
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
const BASE_URL = 'https://www.omdbapi.com/';


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
      `${BASE_URL}?s=${query}&apikey=${apiKey}`
    );
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }

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



// 
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});




// swiper

const getTopRatedMovies = async (page) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${apiKey}&s=series&page=${page}`);
    const data = await response.json();

    if (!data.Search) {
      console.log("No results found for the provided search criteria.");
      return;
    }

    const detailedMovies = await Promise.all(
      data.Search.map(async (movie) => {
        const movieDetailsResponse = await fetch(`${BASE_URL}?apikey=${apiKey}&i=${movie.imdbID}`);
        const movieDetails = await movieDetailsResponse.json();
        return { ...movie, ...movieDetails };
      })
    );

    console.log(detailedMovies);
    createCard(detailedMovies);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const createCard = (data) => {
  const swiperWrapper = document.getElementById("swiper-wrapper");

  data.forEach((item) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.style.backgroundImage = `url(${item.Poster})`;

    slide.innerHTML = `
      <div class="card">
        <span class="rating">${item.imdbRating}</span>
        <div>
          <h4>${item.Title}</h4>
          <div class="container-stars"></div>
          <p>${item.Released}</p>
          <p>${item.Plot}</p>
        </div>
      </div>
    `;
    swiperWrapper.appendChild(slide);
    slide.addEventListener("click", () => {
      openOrFocusDetailsTab(item.imdbID);
    });
  });

  swiper.update();
};

getTopRatedMovies(1);



