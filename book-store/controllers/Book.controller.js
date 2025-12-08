import { Book } from "../models/Book.model.js";

// Add book
export const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all books
export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// Get book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
};

// Update book
export const updateBook = async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete book
export const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
};
