import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        mId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        movieName: {
            type: String,
            required: true,
            trim: true,
        },

        movieDescription: {
            type: String,
            trim: true,
        },

        movieGenre: {
            type: [String],
            default: [], 
        },

        movieYear: {
            type: Number,
        },

        durationMinutes: {
            type: Number,
        },

        rating: {
            type: Number,
            default: 0,
        },

        languages: {
            type: [String],
            default: ["english"],
        },

        cast: {
            type: [String],
            default: [],
        },

        moviePoster: {
            type: String,
            trim: true,
        },

        isPublished: {
            type: Boolean,
            default: true,
        },
    },

    { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);
