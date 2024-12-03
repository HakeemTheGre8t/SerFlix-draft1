// Array to hold the list of films
let films = JSON.parse(localStorage.getItem('films')) || [];

// Select DOM elements
const filmTitleInput = document.getElementById('filmTitle');
const addFilmButton = document.getElementById('addFilmButton');
const filmList = document.getElementById('filmList');
const spinButton = document.getElementById('spinButton');
const randomFilmDisplay = document.getElementById('randomFilm');
const suggestButton = document.getElementById('suggestButton');
const suggestedMovieDisplay = document.getElementById('suggestedMovie');

// Function to update the displayed film list
function updateFilmList() {
  filmList.innerHTML = ''; // Clear the current list
  films.forEach((film, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = film;

    // Add a delete button for each film
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.addEventListener('click', () => {
      films.splice(index, 1); // Remove the film from the array
      localStorage.setItem('films', JSON.stringify(films)); // Update local storage
      updateFilmList(); // Update the displayed list
    });



    listItem.appendChild(deleteButton);
    filmList.appendChild(listItem);
});
}



// Initialize the film list on page load
updateFilmList();

// Function to add a film to the list
addFilmButton.addEventListener('click', () => {
  const filmTitle = filmTitleInput.value.trim();
  if (filmTitle !== '') {
    films.push(filmTitle); // Add the film to the array
    localStorage.setItem('films', JSON.stringify(films)); // Save to local storage
    updateFilmList(); // Update the displayed film list
    filmTitleInput.value = ''; // Clear the input field
  }
});



// Function to randomly select a film from the list

spinButton.addEventListener('click', () => {
  if (films.length === 0) {
    randomFilmDisplay.textContent = 'Add some movies first!';
  } else {
    const randomIndex = Math.floor(Math.random() * films.length);
    const selectedFilm = films[randomIndex];
    randomFilmDisplay.textContent = `Movie Night Pick: ${selectedFilm}`;
  }
});



// Function to fetch a suggested movie using the OMDB API
suggestButton.addEventListener('click', async () => {
  const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=b9509f1'; // Replace with your actual OMDB API key
  const randomMovieTitles = ['Inception', 'Titanic', 'Avatar', 'Jaws', 'Gladiator']; // Example titles
  const randomTitle = randomMovieTitles[Math.floor(Math.random() * randomMovieTitles.length)];

  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(randomTitle)}&apikey=${apiKey}`);
    const movieData = await response.json();



    if (movieData.Response === 'True') {
      suggestedMovieDisplay.textContent = `Suggestion: ${movieData.Title} (${movieData.Year}) - ${movieData.Genre}`;
    } else {
      suggestedMovieDisplay.textContent = 'Could not fetch a suggestion. Try again!';
    }
  } catch (error) {
    suggestedMovieDisplay.textContent = 'Error fetching movie. Check your internet connection.';
  }
});