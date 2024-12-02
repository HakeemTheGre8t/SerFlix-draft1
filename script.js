// Get references to DOM elements
const filmTitleInput = document.getElementById('filmTitle');
const addFilmButton = document.getElementById('addFilmButton');
const filmList = document.getElementById('filmList');
const spinButton = document.getElementById('spinButton');
const randomFilmDisplay = document.getElementById('randomFilm');
const suggestButton = document.getElementById('suggestButton');
const suggestedMovieDisplay = document.getElementById('suggestedMovie');
// Initialise an empty array for films
let films = [];
// Load films from local storage on page load
window.onload = () => {
const storedFilms = JSON.parse(localStorage.getItem('films'));
    if (storedFilms) {
    films = storedFilms;
    updateFilmList();
    }
};
// Function to add a film to the list
addFilmButton.addEventListener('click', () => {
  const filmTitle = filmTitleInput.value.trim();
  if (filmTitle !== '') {
    films.push(filmTitle);
    localStorage.setItem('films', JSON.stringify(films)); // Save to local storage
    updateFilmList(); // Update the displayed film list
    filmTitleInput.value = ''; // Clear the input field
  }
});
// Function to update the film list displayed on the page
function updateFilmList() {
  filmList.innerHTML = '';
  films.forEach(film => {
    const listItem = document.createElement('li');
    listItem.textContent = film;
    filmList.appendChild(listItem);
  });
}
// Function to spin the wheel and choose a random film from the list
spinButton.addEventListener('click', () => {
  if (films.length > 0) {
    const randomIndex = Math.floor(Math.random() * films.length);
    const selectedFilm = films[randomIndex];
    randomFilmDisplay.textContent = `Chosen Film: ${selectedFilm}`;
  } else {
    randomFilmDisplay.textContent = 'No films available. Please add films first.';
  }
});
// Function to fetch a random movie suggestion from the OMDB API
suggestButton.addEventListener('click', async () => {
  const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=b9509f1');
  const data = await response.json();
  if (data.Response === 'True') {
    const randomFilm = data.Search[Math.floor(Math.random() * data.Search.length)];
    suggestedMovieDisplay.textContent = `Suggested Movie: ${randomFilm.Title} (${randomFilm.Year})`;
  } else {
    suggestedMovieDisplay.textContent = 'Unable to fetch suggestion. Try again later.';
  }
});


