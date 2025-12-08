import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../services/api";
import fallbackMovie from "../assets/fallbackMovie.png";

// Normalize backend response into a plain array of movies
const normalizeMovies = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && Array.isArray(data.movies)) return data.movies;
    return null;
};

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await apiService.getMovies();
            const moviesArray = normalizeMovies(data);

            if (moviesArray) {
                setMovies(moviesArray);
            } else {
                console.log("Unexpected movies response:", data);
                setError("Invalid response from server.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch movies.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            fetchMovies();
            return;
        }

        try {
            setLoading(true);
            setError("");
            const data = await apiService.searchMovies(searchTerm.trim());
            const moviesArray = normalizeMovies(data);

            if (moviesArray) {
                setMovies(moviesArray);
            } else {
                console.log("Unexpected search response:", data);
                setError("Invalid response from server.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to search movies.");
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        fetchMovies();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return;

        try {
            setDeletingId(id);
            await apiService.deleteMovie(id);
            setMovies(movies.filter(movie => movie._id !== id));
        } catch (err) {
            console.error(err);
            setError("Failed to delete movie.");
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="min-h-screen p-6">
            {/* Header + search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Movies Collection
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Discover and manage your favorite movies.
                    </p>
                </div>

                <Link
                    to="/add-movie"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                    <span>Add Movie</span>
                </Link>

                <form
                    onSubmit={handleSearch}
                    className="w-full md:w-auto flex flex-col sm:flex-row gap-3 sm:items-center"
                >
                    <div className="relative flex-1 min-w-[250px]">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="6" />
                                <path d="M16 16l4 4" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 shadow-sm transition-colors"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="px-4 py-3 rounded-lg bg-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-300"
                        >
                            Clear
                        </button>
                    )}
                </form>
            </div>

            {/* Error state */}
            {error && (
                <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-800 text-sm">
                    {error}
                </div>
            )}

            {/* Loading state */}
            {loading && (
                <div className="py-10 flex flex-col items-center justify-center gap-3">
                    <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                    <p className="text-gray-500 text-sm">Loading movies...</p>
                </div>
            )}

            {/* Movie grid */}
            {!loading && movies.length > 0 && (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {movies.map((movie) => {
                        const posterUrl = apiService.buildPosterUrl(movie.moviePoster);

                        return (
                            <Link
                                key={movie._id}
                                to={`/movies/${movie._id}`}
                                className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Poster */}
                                <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-200">
                                    <img
                                        src={posterUrl || fallbackMovie}
                                        alt={movie.movieName}
                                        className="w-full h-full object-cover object-center"
                                        onError={(e) => {
                                            // If image fails, fallback to placeholder
                                            e.currentTarget.src = fallbackMovie;
                                        }}
                                    />

                                    {/* Status badge */}
                                    <div className="absolute top-2 left-2 px-2 py-1 rounded bg-white/90 text-xs font-medium text-gray-700">
                                        {movie.isPublished ? "Published" : "Draft"}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {movie.movieName}
                                    </h2>

                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                        {movie.movieYear && <span>{movie.movieYear}</span>}
                                        {movie.durationMinutes && <span>• {movie.durationMinutes} min</span>}
                                        {typeof movie.rating === "number" && (
                                            <span className="flex items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-yellow-500"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M12 3l2.39 4.85L20 9.27l-3.8 3.7L17.48 19 12 16.27 6.52 19l1.28-6.03L4 9.27l5.61-1.42L12 3z" />
                                                </svg>
                                                {movie.rating}/10
                                            </span>
                                        )}
                                    </div>

                                    {/* Genres */}
                                    {Array.isArray(movie.movieGenre) && movie.movieGenre.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {movie.movieGenre.slice(0, 3).map((genre) => (
                                                <span
                                                    key={genre}
                                                    className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs"
                                                >
                                                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                                </span>
                                            ))}
                                            {movie.movieGenre.length > 3 && (
                                                <span className="px-2 py-1 rounded bg-gray-100 text-gray-500 text-xs">
                                                    +{movie.movieGenre.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Action buttons */}
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/movies/${movie._id}/edit`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M4 20h4l10-10-4-4L4 16v4z" />
                                            </svg>
                                            <span>Edit</span>
                                        </Link>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleDelete(movie._id);
                                            }}
                                            disabled={deletingId === movie._id}
                                            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded border border-red-300 bg-white text-red-700 text-sm font-medium hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M6 7h12" />
                                                <path d="M10 11v6" />
                                                <path d="M14 11v6" />
                                                <path d="M9 7V5h6v2" />
                                                <path d="M7 7l1 12h8l1-12" />
                                            </svg>
                                            <span>{deletingId === movie._id ? "Deleting..." : "Delete"}</span>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Empty state */}
            {!loading && movies.length === 0 && !error && (
                <div className="py-16 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 border border-gray-300 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                            <line x1="7" y1="2" x2="7" y2="6" />
                            <line x1="17" y1="2" x2="17" y2="6" />
                            <line x1="2" y1="7" x2="22" y2="7" />
                            <line x1="2" y1="17" x2="22" y2="17" />
                            <line x1="7" y1="22" x2="7" y2="18" />
                            <line x1="17" y1="22" x2="17" y2="18" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No movies found</h3>
                    <p className="text-gray-600 text-sm mb-6">Start building your collection by adding your first movie.</p>
                    <Link
                        to="/add-movie"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                        <span>Add Your First Movie</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MovieList;
