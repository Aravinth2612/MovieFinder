import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (imdbID) => {
    const updated = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-red-500">My Favorites</h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg shadow-md text-white transition"
        >
          ← Home
        </button>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center mt-20">
          <p className="text-gray-400 text-lg mb-4">No favorite movies yet.</p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg shadow-md text-white transition"
          >
            Go Back Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 relative"
            >
              <Link to={`/movie/${movie.imdbID}`}>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-64 object-cover rounded-lg mb-3 hover:opacity-80 transition"
                />
              </Link>
            <div>

              <h3 className="font-semibold text-lg">{movie.Title}</h3>
              <p className="text-gray-400 text-sm mb-3">{movie.Year}</p>
            </div>

              <button
                onClick={() => removeFavorite(movie.imdbID)}
                className=" px-2 py-1 bg-red-500 hover:bg-red-600 rounded-full text-sm font-medium transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
