const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook
} = require("../controllers/Book.controller");

// CREATE
router.post("/", addBook);

// READ
router.get("/", getBooks);

// UPDATE
router.put("/:id", updateBook);

// DELETE
router.delete("/:id", deleteBook);

module.exports = router;
