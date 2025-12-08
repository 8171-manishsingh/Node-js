import { Movie } from "../models/movie.model.js";
import fs from "fs/promises";
import path from "path";
import { toArray } from "../utils/toArray.js";

// ---------------------------------------------
// ADD MOVIE
// ---------------------------------------------
export const addMovie = async (req, res) => {
    try {
        const {
            mId,
            movieName,
            movieDescription,
            movieGenre,
            movieYear,
            durationMinutes,
            rating,
            languages,
            cast,
            isPublished
        } = req.body;

        const file = req.file;

        if (
            !mId ||
            !movieName ||
            !movieDescription ||
            !movieGenre ||
            !movieYear ||
            !durationMinutes ||
            !rating ||
            !languages ||
            !cast ||
            !isPublished
        ) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        if (!file) {
            return res.status(400).json({ error: "Movie poster is not provided" });
        }

        const newMovie = new Movie({
            mId,
            movieName,
            movieDescription,
            movieGenre: toArray(movieGenre),
            movieYear: parseInt(movieYear),
            durationMinutes: parseInt(durationMinutes),
            rating: parseFloat(rating),
            languages: toArray(languages),
            cast: toArray(cast),
            moviePoster: `/uploads/${file.filename}`,
            isPublished: isPublished === "true" || isPublished === true
        });

        const savedMovie = await newMovie.save();
        return res.status(201).json({ savedMovie });

    } catch (error) {
        console.error("Error in addMovie controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// ---------------------------------------------
// DELETE MOVIE
// ---------------------------------------------
export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ error: "Id is not provided!" });

        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ error: "No Movie Found!" });

        if (movie.moviePoster) {
            const relativePath = movie.moviePoster.replace(/^\//, "");
            const absolutePath = path.join(process.cwd(), relativePath);

            try {
                await fs.unlink(absolutePath);
            } catch (error) {
                console.warn("Could not delete old image:", error.message);
            }
        }

        await Movie.findByIdAndDelete(id);
        return res.status(200).json({ message: "Movie deleted successfully" });

    } catch (error) {
        console.error("Error in deleteMovie controller:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// ---------------------------------------------
// GET ALL MOVIES
// ---------------------------------------------
export const getMovies = async (req, res) => {
    try {
        const result = await Movie.find();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error in getMovies controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// ---------------------------------------------
// GET MOVIE BY ID
// ---------------------------------------------
export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "Id is not provided!" });

        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ error: "No movie found!" });

        return res.status(200).json(movie);

    } catch (error) {
        console.error("Error in getMovieById controller:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// ---------------------------------------------
// SEARCH MOVIES
// ---------------------------------------------
export const searchMovies = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({ error: "Title query parameter is required" });
        }

        const result = await Movie.find({
            movieName: { $regex: title, $options: "i" }
        });

        return res.status(200).json(result);

    } catch (error) {
        console.error("Error in searchMovies controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// ---------------------------------------------
// UPDATE MOVIE
// ---------------------------------------------
export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;

        const {
            mId,
            movieName,
            movieDescription,
            movieGenre,
            movieYear,
            durationMinutes,
            rating,
            languages,
            cast,
            isPublished,
        } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Id is not provided!" });
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: "No movie found!" });
        }

        const data = {};

        if (mId) data.mId = mId;
        if (movieName) data.movieName = movieName;
        if (movieDescription) data.movieDescription = movieDescription;

        if (movieGenre) data.movieGenre = toArray(movieGenre);
        if (languages) data.languages = toArray(languages);
        if (cast) data.cast = toArray(cast);

        if (movieYear) data.movieYear = parseInt(movieYear, 10);
        if (durationMinutes) data.durationMinutes = parseInt(durationMinutes, 10);
        if (rating) data.rating = parseFloat(rating);

        if (typeof isPublished !== "undefined") {
            data.isPublished = isPublished === "true" || isPublished === true;
        }

        if (file) {
            if (movie.moviePoster) {
                const relativePath = movie.moviePoster.replace(/^\//, "");
                const absolutePath = path.join(process.cwd(), relativePath);
                try {
                    await fs.unlink(absolutePath);
                } catch (error) {
                    console.warn("Could not delete old image:", error.message);
                }
            }
            data.moviePoster = `/uploads/${file.filename}`;
        }

        const result = await Movie.updateOne({ _id: movie._id }, { $set: data });
        return res.status(200).json(result);

    } catch (error) {
        console.error("Error in updateMovie controller:", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};