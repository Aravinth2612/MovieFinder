import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(savedFavorites.some((fav) => fav.imdbID === movie.imdbID));
    }, [movie.imdbID]);

    const toggleFavorite = () => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (isFavorite) {
            const updated = savedFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
            localStorage.setItem("favorites", JSON.stringify(updated));
            setIsFavorite(false);
        } else {
            savedFavorites.push(movie);
            localStorage.setItem("favorites", JSON.stringify(savedFavorites));
            setIsFavorite(true);
        }
    };

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

            <button
                onClick={toggleFavorite}
                className={`mt-2 px-3 py-1 rounded ${isFavorite ? "bg-red-500" : "bg-gray-600"
                    }`}
            >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
    );
}

export default MovieCard;
