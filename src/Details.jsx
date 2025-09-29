import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await axios.get(`https://www.omdbapi.com/`, {
                    params: { i: id, apikey: "47eae1d8" },
                });
                setMovie(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div className="text-center text-gray-400 mt-10">Loading...</div>;
    }

    return (
        <section className="relative min-h-screen text-white">
            <div className="absolute inset-0">
                <img
                    src={movie.Poster}
                    className="w-full h-full object-cover opacity-40"
                    alt={movie.Title}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"></div>
            </div>

            <div className="relative container mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                    <img
                        src={movie.Poster}
                        alt="Movie Poster"
                        className="w-64 rounded-xl shadow-lg border-4 border-gray-700"
                    />
                </div>

                <div className="flex flex-col space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold">
                            {movie.Title}{" "}
                            <span className="text-red-400 font-medium">({movie.Year})</span>
                        </h1>
                        <p className="mt-2 text-gray-300 italic">{movie.Genre}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {movie.Runtime && (
                            <span className="px-3 py-1 bg-red-600 text-sm rounded-full">
                                {movie.Runtime}
                            </span>
                        )}
                        {movie.Released && (
                            <span className="px-3 py-1 bg-gray-700 text-sm rounded-full">
                                {movie.Released}
                            </span>
                        )}
                        {movie.Country && (
                            <span className="px-3 py-1 bg-gray-700 text-sm rounded-full">
                                {movie.Country}
                            </span>
                        )}
                        {movie.Language && (
                            <span className="px-3 py-1 bg-gray-700 text-sm rounded-full">
                                {movie.Language}
                            </span>
                        )}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Plot</h2>
                        <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-gray-800/70 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-1">Actors</h3>
                            <p className="text-sm text-gray-300">{movie.Actors}</p>
                        </div>
                        <div className="bg-gray-800/70 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-1">Director</h3>
                            <p className="text-sm text-gray-300">{movie.Director}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Ratings</h3>
                        <div className="flex flex-wrap gap-3">
                            {movie.Ratings?.map((r, i) => (
                                <span
                                    key={i}
                                    className="bg-gray-800 px-4 py-2 rounded-full text-sm shadow"
                                >
                                    {r.Source}: <span className="text-red-400">{r.Value}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 self-start px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition"
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Details;
