// Initialise an empty array to store films
let filmsArray = [];
let movies = [];

// Add film to the list and save it to local storage
document.getElementById("addFilmBtn").addEventListener("click", function() {
    const filmTitle = document.getElementById("filmTitle").value.trim();

    if (filmTitle) {
        filmsArray.push(filmTitle);
        localStorage.setItem("filmsArray", JSON.stringify(filmsArray));

        // Clear input field and update the array in the UI
        document.getElementById("filmTitle").value = "";
        displayFilms();
    }
});

// New detailedFilmsArray to store films with additional details
let detailedFilmsArray = JSON.parse(localStorage.getItem("detailedFilmsArray")) || [];

// Function to save detailedFilmsArray to local storage
function saveDetailedFilmsToLocalStorage() {
    localStorage.setItem("detailedFilmsArray", JSON.stringify(detailedFilmsArray));
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("addDetailFilmBtn").addEventListener("click", function() {
        const title = document.getElementById("title").value.trim();
        const genre = document.getElementById("genre").value.trim();
        const year = document.getElementById("year").value.trim();
    
        // Check if all fields are filled
        if (title && genre && year) {
            // Create a new film object
            const filmObject = {title, genre, year,};
    
            // Add the film object to the detailedFilmsArray
            detailedFilmsArray.push(filmObject);
    
            //  Save updated array to local storage
            saveDetailedFilmsToLocalStorage();
    
            // Clear the form fields
            document.getElementById("title").value = "";
            document.getElementById("genre").value = "";
            document.getElementById("year").value = "";
    
            // Update the displayed list
            displayDetailedFilms();
        }else {
            alert("Please fill in all fields.");
        }
    });
});


// Function to display detailed films
function displayDetailedFilms() {
    const detailedFilmList = document.getElementById("detailedFilmList");
    detailedFilmList.innerHTML = ""; // Clear the list

    detailedFilmsArray.forEach(film => {
        const li = document.createElement("li");
        li.textContent = `${film.title} (${film.year}) - Genre: ${film.genre}`;
        detailedFilmList.appendChild(li);  
    });
}

//Initial display of detailed films from local storage 
displayDetailedFilms();

//Function to display films from the array in the UI
function displayFilms() {
    const filmList = document.getElementById("filmList");

// Clear the list
    filmList.innerHTML = ""; 

    if (Array.isArray(movies) && movies.length > 0) {
        // Loop through each movie and create a list item
        movies.forEach(movie => {
            const listItem = document.getElementById("filmList");
            listItem.textContent = `${movies.title} (${movies.year})`;
            filmList.appendChild(listItem);
        });
    } else {
        // Display a message if no movies are available 
        filmList.innerHTML = "<li>No film available to display.</li>";
    }
}



// Load films from local storage when the page laods
window.onload = function() {
    const storedFilms = localStorage.getItem("filmsArray");
    if (storedFilms) {
        filmsArray = JSON.parse(storedFilms);
        displayFilms();
    }
};

// Pick two random films from the list and start the spin
document.getElementById("randomFilmBtn").addEventListener("click", function() {
    if (filmsArray.length > 1) { // Make sure there are at least two films
        const randomIndex1 = Math.floor(Math.random() * filmsArray.length);
        let randomIndex2;


// Ensure the second film is different from the first
        do {
            randomIndex2 = Math.floor(Math.random() * filmsArray.length);
        }while (randomIndex2 === randomIndex1);

        const selectedFilm1 = filmsArray[randomIndex1];
        const selectedFilm2 = filmsArray[randomIndex2];

// Display both selected films
        document.getElementById("randomFilmDisplay").innerText = 
            `Selected Films: 1) ${selectedFilm1}, 2) ${selectedFilm2}`;

// Call the function spin and pick between the two
        spinWheel(selectedFilm1, selectedFilm2);
    } else {
        document.getElementById("randomFilmDisplay").innerText = "Add films to the list!";
    }
});

function spinWheel(film1, film2) {
    let resultDisplay = document.getElementById("randomFilmDisplay");
    resultDisplay.innerText += "\nspinning the wheel...";

    setTimeout(() => {
        const winner = Math.random() < 0.5 ? film1 : film2; // 50/50 chance for each film
        resultDisplay.innerText = `The winner is: ${winner}`;
    }, 3000); // Simulate a 3-second "spin"
}

//Capture these film form details and store them in an array as an object
//const filmsArray = JSON.parse(localStorage.getItem("filmsArray")) || [];

document.getElementById("addFilmBtn").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const year = document.getElementById("year").value;
    const description = document.getElementById("description").value;

    if (title && genre && year) {
        const film = { title, genre, year, description };
        filmsArray.push(film);
        localStorage.setItem("filmsArray", JSON.stringify(filmsArray));

        // Clear form fields after adding 
        document.getElementById("filmForm").reset();

        console.log("Film added;", film);
    }else {
        alert("Please fill out all required fields.");
    }
});

//Above setup captures additional information about each film and saves it in localStorage as an object, which will make it easier to work with later

//Manging Profiles and User-specific Films Lists - if a user profile exists in localStorage, then saves or loads their specific film list
let currentUser = null;

document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    if (username) {
        currentUser = username;
        document.getElementById("currentUser").innerText = `logged in as: ${currentUser}`;

        // Load the user's film lsit or initialise a new one
        const userFilms = JSON.parse(localStorage.getItem(currentUser)) || [];
        console.log("Loaded films for", currentUser, userFilms);

        //Example: Update the global filmsArray
        filmsArray.length = 0;
        filmsArray.push(...userFilms);
    }
});

document.getElementById("addFilmBtn").addEventListener("click", () => {
    if (currentUser) {
        const title = document.getElementById("title").value;
        const genre = document.getElementById("genre").value;
        const year = document.getElementById("year").value;
        const description = document.getElementById("description").value;

        if (title && genre && year) {
            const film = { title, genre, year, description };
            filmsArray.push(film);
            localStorage.setItem(currentUser, JSON.stringify(filmsArray));
            document.getElementById("filmForm").reset();
        } else {
            alert("Please fill out all required fields.");
        }
    } else {
        alert("Please log in to save films to your profile.");
    }
});

// * Storing our data output div that will house our advice in a variable
const dataOutput = document.querySelector(".dataOutput");
const advice = document.querySelector(".advice");
const getBtn = document.getElementById("getBtn");

// * Asynchronous function to fetch data from the API endpoint
async function getData() {
  // * Await a response from the API
    console.log("Fetching data from the API...");
    const response = await fetch("https://api.themoviedb.org/3/movie/550?api_key=96e2e205074fb79b6b0f4d7a45315524");
  // * Await the response and covert it to JSON upon receiving it
    const apiData = await response.json();
    console.log("Data recieved from API:", apiData);
  // * Once we have received the data return it from our function so we can work with it
    return apiData;
}

// * Add event listener that will detect when the DOM has completely loaded and then run the associated code
document.addEventListener("DOMContentLoaded", async () => {
  // * Declare an empty array to hold the api data
    let apiData = [];

  // * Try Catch Block - Allows us to handle errors
    try {
    // * Try to fetch the data
    apiData = await getData();
    // * If an error occurs, catch it
    } catch (error) {
    // * And finally log the error information
    console.log(error);
    }
});

async function getData() {
    try {
        const response = await fetch("https://api.themoviedb.org/3/movie/550?api_key=96e2e205074fb79b6b0f4d7a45315524");
        const apiData = await response.json();
        console.log("Full API response:", apiData);
        return apiData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
document.getElementById("suggestRandomFilmBtn").addEventListener("click", async () => {
    console.log("Button clicked! Fetching random film..."); 
    try {
        const apiData = await getData();
        if (!apiData || !apiData.results || apiData.results.length === 0) {
        console.error("No results found in the API data.");
        document.getElementById("randomFilmDisplay").textContent = "No suggestions available.";
        return;
        }

    const randomMovie = apiData.results[Math.floor(Math.random() * apiData.results.length)];
    console.log("Error fetching or displaying movie data:", error);

    document.getElementById("randomFilmDisplay").textContent = `Suggested Movie: ${randomMovie.title}`;
    } catch (error) {
    console.log("Random movie selected:", randomMovie.title);
    }
});


    // Choose a random movie from the results

    let randomMovie = null; // Global variable to store the selected random movie


// Fetch movies from the API once
    async function fetchMovies() {
        try {
            const response = await fetch("https://api.themoviedb.org/3/movie/550?api_key=96e2e205074fb79b6b0f4d7a45315524");
            const data = await response.json();
            
            // Assign the results to movies array 
            movies = data.results || []; // Use an empty array if data.results is underfined

            displayFilms(); // Call display function to update the UI with fetched movies
            
            // Log the entire API response to check its structure
            console.log("API Data:", data);
            
            
            if (data && data.results && data.results.length > 0) {
            }movies = data.results; // Store movies globally for reuse
            console.log("Movies fetched:", movies);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

// Call fetchMovies when the page loads or on a specific action
    document.addEventListener("DOMContentLoaded", fetchMovies);

// Add an event listener to the button to display films
    document.getElementById("suggestRandomFilmBtn").addEventListener("click", displayFilms);

// Function to choose a random movie from the fetched movies array
    function chooseRandomMovie() {
        if (movies.length === 0) {
            console.error("No movies available to choose from.");
            document.getElementById("randomFilmDisplay").textContent = "No movie available for suggestions.";
            return;
        }
        const randomMovie = movies[Math.floor(Math.random() * movies.length)]; // Set the randomMovie globally 
        console.log("Random movie chosen:", randomMovie.title);
        displayMovieDetails(); // Call function to display details
    }
    // Set up button to trigger random movie suggestion 
    document.getElementById("suggestRandomFilmBtn").addEventListener("click", chooseRandomMovie);

    // Call fetchMovies once on page load
    document.addEventListener("DOMContentLoaded", async () => {
        await fetchMovies();
    });

    function chooseRandomMovie() {
        if (movies.length === 0) {
            console.error("No movies available to choose from.");
            document.getElementById("randomFilmDisplay").textContent = "No movies available for suggestions.";
            return;
        }
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        console.log("Random movie chosen:", randomMovie.title);
        document.getElementById("randomFilmDisplay").textContent = `Suggested Movie: ${randomMovie.title}`;
    }
    
    document.getElementById("suggestRandomFilmBtn").addEventListener("click", chooseRandomMovie);


    // Display movie details
    function displayMovieDetails() {
        if (randomMovie) {
            document.getElementById("randomFilmDisplay").innerHTML = `Suggested Movies: <strong>${randomMovie.title}</strong> - ${randomMovie.overview}`;
        } else {
            console.error("No movie selected to display details.");
        }
    }

// Event listener for the suggestion button 
document.getElementById("suggestRandomFilmBtn").addEventListener("click", async () => {
    console.log("Button clicked! Fetching random film...");

    try {
        const apiData = await getData(); //Assuming getData() fetches film data
        if (!apiData || !apiData.results || apiData.results.length === 0) {
            console.error("No results found in the API data.");
            document.getElementById("randomFilmDisplay").textContent = "No suggestion available.";
            return;
        }

        // Select a random movie from the results array
        const randomMovie = apiData.results[Math.floor(math.random() * apiData.results.length)];
        console.log("Random movie selected:", randomMovie.title);


        // Display the random movie title
        document.getElementById("randomFilmDisplay").textContent = `Suggested Movie: ${randomMovie.title}`;
    } catch (error) {
        console.error("Error fetching or displaying movie data:", error);
    }
});
