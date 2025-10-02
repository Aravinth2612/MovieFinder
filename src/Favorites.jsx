import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

function Favorites({ favorites, removeFavorite }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black px-6 py-10">
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
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFav={true}
              removeFavorite={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
