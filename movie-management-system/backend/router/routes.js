import express from "express";
import { upload } from "../middleware/upload.js";
import { addMovie, getMovieById, getMovies, searchMovies, updateMovie, deleteMovie } from "../controllers/controllers.js";    

const router = express.Router();

router.post("/movies", upload.single("moviePoster"), addMovie);
router.get("/movies", getMovies);
router.get("/movies/search", searchMovies);
router.get("/movies/:id", getMovieById);
router.put("/movies/:id", upload.single("moviePoster"), updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router