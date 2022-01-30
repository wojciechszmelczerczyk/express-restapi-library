const express = require("express");
const app = express();
const fs = require("fs");
const { dbPath } = require("./config");
let book = {};

const port = 3001;

app.use(express.json());

app.listen(port, () => console.log("Server listening on port 3001"));

app.get("/books", (req, res) => {
  const books = require("./db/books.json");

  res.json(books);
});

app.get("/books/:id", (req, res) => {
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
});

app.post("/books/create", (req, res) => {
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
});

app.delete("/books/:id", (req, res) => {
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
});

app.put("/books/:id", (req, res) => {});
