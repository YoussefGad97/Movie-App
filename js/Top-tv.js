const IMGPATH= "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI="https://api.themoviedb.org/3/search/movie?&api_key=0646712466eeb817bc8626f04f2f9532";
const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");


getMovies(DAYO);

async function getMovies(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    showMovies(data.results);
}


// // // MAIN Movie titles //

function showMovies(movies) {
    const resultsContainer = document.querySelector('.results');
  
    // Clear previous results
    resultsContainer.innerHTML = '';
  
    // Create movie elements for each movie and append to results container
    movies.forEach((movie, index) => {
      const { poster_path, title, overview, vote_average } = movie;
  
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');
      movieElement.innerHTML = `
          <img src="${IMGPATH}${poster_path}" alt="${title}">
          <div class="movie-info">
            <h3>${title}</h3>
            <span class="rating ${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
          </div>
        `;
      resultsContainer.appendChild(movieElement);
  
      // Add click event listener to movie poster
      const poster = movieElement.querySelector('img');
      poster.addEventListener('click', () => {
        const movieName = encodeURIComponent(title);
        const searchUrl = `https://hdtodaytv.live/?s=${movieName}`;
        // const searchUrl = `https://www.google.com/search?q=hdtoday.tv+${movieName}`;
        window.open(searchUrl, '_blank');
      });
    });
}
  



// Movie rating //
function getClassByRate(vote){
    if(vote >= 8){
        return "green";
    }
    else if (vote >=5){
        return "orange";
    }
    else
    {
        return "red";
    }
    
}

// Search APi //
const apiUrl = 'https://api.themoviedb.org/3/search/movie';
const apiKey = '0646712466eeb817bc8626f04f2f9532';

function searchMovies() {
  // Get the search query from the input element
  const query = document.getElementById('search-input').value;
  const url = `${apiUrl}?api_key=${apiKey}&query=${query}`;

  // Make the API request and handle the response
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Clear the previous results
      const resultsContainer = document.getElementById('results-container');
      resultsContainer.innerHTML = '';

      // Loop through the search results and create a movie element for each movie
      const movies = data.results;
      movies.forEach(movie => {
        const { poster_path, title, overview, vote_average } = movie;
        if (poster_path !== null) {
          const posterUrl = `https://image.tmdb.org/t/p/w185${poster_path}`;
          const movieElement = document.createElement('div');
          movieElement.classList.add('movie');
          movieElement.innerHTML = `
            <img src="${posterUrl}" alt="${title}">
            <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getClassByRate(vote_average)}">${vote_average}</span></div>
              <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
              </div>
          `;
          resultsContainer.appendChild(movieElement); 

          const poster = movieElement.querySelector('img');
          poster.addEventListener('click', () => {
            const movieName = encodeURIComponent(title);
            const searchUrl = `https://hdtodaytv.live/?s=${movieName}`;
            window.open(searchUrl, '_blank');
        });



        }

        
        
      });
      
      
    })

    
    
}



