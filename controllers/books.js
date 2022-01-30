const fs = require("fs");
const { dbPath } = require("../config");
let book = {};

const getBooks = (req, res) => {
  const books = require("../db/books.json");
  res.json(books);
};

const getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  let selectedBook;

  fs.readFile(`${process.cwd()}${dbPath}`, "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
      let obj = JSON.parse(data); // parse JSON to object

      selectedBook = obj.filter((book) => book["id"] === id); // return specific book

      res.json(selectedBook);
    }
  });
};

const createBook = (req, res) => {
  book = req.body;
  console.log(book);

  fs.readFile(`${process.cwd()}${dbPath}`, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data); //now converting it to an object

      obj.push(book); //adding the data

      let json = JSON.stringify(obj, null, 2); //converting it back to json

      fs.writeFile(`${process.cwd()}${dbPath}`, json, "utf8", (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Book added to library!");
        }
      });
    }
  });
};

const updateBook = (req, res) => {
  // catch id
  const id = parseInt(req.params.id);

  const bookData = req.body;

  fs.readFile(`${process.cwd()}${dbPath}`, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data); //now converting it to an object

      objFiltered = obj.filter((book) => book["id"] !== id); // return books without one with id passed as a param

      objFiltered.push(bookData); // push new book to books list

      let json = JSON.stringify(objFiltered, null, 2); //converting it back to json

      fs.writeFile(`${process.cwd()}${dbPath}`, json, "utf8", (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Book updated!");
        }
      });
    }
  });
};

const deleteBook = (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(`${process.cwd()}${dbPath}`, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data); //now converting it to an object

      let deletedBook = obj.filter((book) => book["id"] !== id); // return array without element with id passed as a parameter

      let json = JSON.stringify(deletedBook, null, 2); //converting it back to json

      fs.writeFile(`${process.cwd()}${dbPath}`, json, "utf8", (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Book deleted from library!");
        }
      });
    }
  });
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
