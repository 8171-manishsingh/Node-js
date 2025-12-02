import express from "express";

const router = express.Router();
import { addBook, getBooks, updateBook, deleteBook, getBookById } from "../controllers/Book.controller.js";

// CREATE
router.post("/", addBook);

// READ
router.get("/", getBooks);

// READ by ID
router.get("/:id", getBookById);

// UPDATE
router.put("/:id", updateBook);

// DELETE
router.delete("/:id", deleteBook);

export default router;