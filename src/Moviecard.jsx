import { Link } from "react-router-dom";

function MovieCard({ movie, isFav, addFavorite, removeFavorite }) {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <Link to={`/movie/${movie.imdbID}`}>
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-64 object-cover rounded hover:opacity-80 transition"
                />
            </Link>
            <h3 className="mt-2 font-bold">{movie.Title}</h3>
            <p className="text-sm text-gray-400">{movie.Year}</p>
            {isFav ? (
                <button
                    onClick={() => removeFavorite(movie.imdbID)}
                    className="mt-2 px-3 py-1 rounded bg-red-500"
                >
                    {"Remove from Favorites"}
                </button>
            ) : (
                <button
                    onClick={() => addFavorite(movie)}
                    className="mt-2 px-3 py-1 rounded bg-gray-600"
                >
                    {"Add To Favorites"}
                </button>
            )
            }

        </div >
    );
}

export default MovieCard;
