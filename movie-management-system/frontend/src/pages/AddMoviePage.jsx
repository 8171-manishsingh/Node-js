import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import { apiService } from "../services/api";

const AddMoviePage = () => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);
            setError("");

            await apiService.addMovie(values);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to add movie.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Add New Movie
                </h1>
                <p className="text-gray-600">
                    Fill in the details to add a new movie.
                </p>
            </div>

            {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-800 text-sm">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <MovieForm onSubmit={handleSubmit} submitting={submitting} />
            </div>
        </div>
    );
};

export default AddMoviePage;
