# Library CRUD API

## Techstack:

- `Express`

## Project Description

### Simple CRUD API

## Requirements:

- `install node`

## How to use:

- `git clone repo` - to clone repository
- `npm i` - to install dependencies
- `node index.js` - to run server

## Database

Database is an arbitrary json file.

```json
[
  {
    "id": 1,
    "title": "Beautiful game",
    "author": "Andrew Kamilsky"
  },
  {
    "id": 2,
    "title": "On the ocean",
    "author": "Matthew Spark"
  },
  {
    "id": 3,
    "title": "Into the abyss",
    "author": "Patrizio Mauricio"
  }
]
```

## Endpoints:

### Get all books

Return all books from library as a response.

- `/books`

```javascript
const getBooks = (req, res) => {
  const books = require("../db/books.json");
  res.json(books);
};
```

### Get book with specific id

Return book with specific id as a response.

- `/books/:id`

```javascript
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
```

### Create book

Create book, return new book.

- `/books/create`

```javascript
book = req.body;

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
```

### Delete book

Return book list without deleted book.

- `/books/:id`

```javascript
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
```

### Update book

Update book by id.

- `/books/:id`

```javascript
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
```
