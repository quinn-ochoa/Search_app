import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.png";
import MovieCard from "./MovieCard";

//83b5e65b

// fde738ee1f6534d701eb0ed70b0a07f4 from TMDB

const API_URL = "https://www.omdbapi.com?apikey=83b5e65b";

// const API_URL = "https://api.themoviedb.org/3/movie/11?api_key=fde738ee1f6534d701eb0ed70b0a07f4";

const movie1 = {
    "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
    "Year": "2016",
    "imdbID": "tt18689424",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTRlNWQwM2ItNjkyZC00MGI3LThkYjktZmE5N2FlMzcyNTIyXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg"
}

const App = () => {

    const[movies, setMovies] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className = "app">
      <h1>MovieBase</h1>

      <div className = "search">
        <input 
            placeholder = "Search for movies"
            value = {searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
            src = {SearchIcon}
            alt="search"
            onClick = {() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 
        ? (
            <div className = "container">
                {movies.map((movie) => (
                        <MovieCard movie = {movie}/> 
                ))}
            </div>
        ) : (
            <div className="empty">
                <h2>No movies found</h2>
            </div>
        )}
    </div>
  );
};

export default App;
