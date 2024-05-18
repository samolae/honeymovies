const fetchMovieDetails = async (imdbID) => {
    const apiKey = "e828ad33";
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
      );
      const movieFullData = await response.json();
      if (movieFullData.Response === "True") {
        displayMovieDetails(movieFullData);
      } else {
        console.log('Movie details not found');
      }
    } catch (error) {
      console.log("Error fetching movie data:", error.message, error);
    }
  };
  
  const displayMovieDetails = (movieFullData) => {
    const detailsBody = document.getElementById('movie-details-body');
    detailsBody.style.background =`url('${movieFullData.Poster}')`;
    detailsBody.style.backgroundSize = "cover";
    detailsBody.style.backgroundRepeat = "no-repeat";
    detailsBody.style.backgroundPosition = "center";
    document.title = `${movieFullData.Title} | Honey Movies`;

    const titleElement = document.getElementById("title");
    const genreElement = document.getElementById("genre");
    const imdbLinkElement = document.getElementById("imdb_link");
    const descriptionElement = document.getElementById("description");
    const image = document.getElementById("image-container-img");
    const starsContainer = document.getElementById('stars-container');
  
    const { Title, Genre, imdbID, Plot, Poster } = movieFullData; // Assuming object structure

    // Assignments using destructured values (no ternary needed):
    titleElement.textContent = Title;
    genreElement.textContent = Genre;
    imdbLinkElement.href = `https://www.imdb.com/title/${imdbID}/`;
    descriptionElement.textContent = Plot;
    image.src = Poster;
    image.alt = Title;
  
    showRating(movieFullData.imdbRating, starsContainer);
  };
  
  // show rating stars
  const showRating = (rating, starsContainer) => {
    starsContainer.innerHTML = ''; 
  
    const fullStars = Math.floor(rating / 2);
    const halfStar = (rating % 2) >= 1 ? 1 : 0;
    const totalStars = 5;
  
    for (let i = 0; i < totalStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      if (i < fullStars) {
        star.classList.add('full');
      } else if (i === fullStars && halfStar) {
        star.classList.add('half');
      }
      starsContainer.appendChild(star);
    }
  };
  
  // Get the IMDb ID from the URL
  const imdbID = new URLSearchParams(window.location.search).get('imdbID');
  if (imdbID) {
    fetchMovieDetails(imdbID);
  }
  