SerFlix: Movie Roulette App
SerFlix is a fun and interactive web application that helps you decide on a movie for movie night! With the movie roulette feature, you can add movies to your list, spin a wheel to randomly select one, or get a random suggestion from the OMDB API. It leverages Local Storage to save your movie list for later use and uses DOM manipulation to dynamically update the user interface.



Key Features
• Add Movies to the List: Users can add movie titles to the film list one at a time. These movies are stored in Local Storage and persist even after the page is refreshed.

• Spin the Wheel: The app randomly selects one movie from the list when you click the “Spin the Wheel” button.

• Suggested Movie: Using the OMDB API, the app fetches a random movie suggestion with its title, release year, and poster, displayed in the UI.

• Clear Functionality: The film list can be cleared, both from the UI and from Local Storage, with a click of the “Clear List” button.



Technologies Used
• HTML: Structure of the web page.
• CSS: Basic styling for layout and design.
• JavaScript: Functionality for adding movies, spinning the wheel, and fetching data from OMDB API.
• Local Storage: Storing the film list across page refreshes.
• OMDB API: Fetching movie suggestions.



Getting Started

Prerequisites
To run SerFlix locally, make sure you have a modern web browser (Chrome, Firefox, etc.).



Steps to Run Locally
1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/SerFlix.git

2. Navigate to the Project Folder
cd SerFlix

3. Open the index.html File in a Browser
You can open the index.html file in your browser by double-clicking it, or by running it through a local server if you prefer.



Usage
• Add Movies: Enter movie titles in the input field and press “Add Movie” to add them to the list.
• Spin the Wheel: Click on “Spin the Wheel” to randomly pick one movie from the list.
• Suggested Movie: Click on “Suggested Movie” to fetch a random suggestion from the OMDB API.
• Clear List: Click on “Clear List” to reset the movie list.


OMDB API Key
To fetch random movie suggestions, you’ll need to insert your OMDB API Key.



How to get your OMDB API Key:

1. Visit the OMDB API website.
2. Sign up for a free account and get your API key.
const apiKey = 'b9509f1'; 



Contributing
Contributions are welcome! Feel free to fork the repository and create a pull request with your suggestions or improvements.



License
This project is open source and available under the MIT License.


Acknowledgements
• OMDB API: For providing a rich movie database to fetch random movie suggestions.
• GitHub: For hosting the repository and providing collaboration features.
