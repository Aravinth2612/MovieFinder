import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import MovieCard from "./MovieCard";
import Searchbox from "./Searchbox";
import Details from "./Details";
import axios from "axios";
import Favorites from "./Favorites";

function Home({ movies, loading, handleMovieSearch }) {
  return (
    <main className="min-h-screen max-w-full mx-auto px-6 bg-gradient-to-b from-black via-gray-900 to-black shadow-inner scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800">
      <Header />
      <Searchbox handleMovieSearch={handleMovieSearch} />
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
        {loading ? (
          <div className="col-span-4 flex justify-center items-center py-20">
            <svg className="animate-spin h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
            </svg>
          </div>
        ) : movies.length > 0 ? (
          movies.map((item, index) => <MovieCard movie={item} key={index} />)
        ) : (
          <div className="text-center col-span-4">
            <h1 className="text-2xl font-bold text-gray-500">No movies found</h1>
          </div>
        )}
      </div>
    </main>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  let handleMovieSearch = async (searchText, type = "") => {
    try {
      setLoading(true);
      const search = await axios.get(`https://www.omdbapi.com/`, {
        params: { s: searchText, type: type, apikey: "47eae1d8" },
      });
      setMovies(search.data.Search || []);
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  let fetchMovies = async () => {
    try {
      const movies = await axios.get(`http://www.omdbapi.com/?s=batman&apikey=47eae1d8`);
      setMovies(movies.data.Search || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home movies={movies} loading={loading} handleMovieSearch={handleMovieSearch} />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
