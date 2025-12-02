const Book = require("./models/Book.model");

// Add book
exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// Update book
exports.updateBook = async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete book
exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
};
