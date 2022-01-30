const express = require("express");

const router = express.Router();

// controller
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

// get all books
router.get("/", getBooks);

// create a book
router.post("/create", createBook);

// get book by id, delete book, update book
router.route("/:id").get(getBookById).delete(deleteBook).put(updateBook);

module.exports = router;
