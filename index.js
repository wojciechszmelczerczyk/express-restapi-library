const express = require("express");
const app = express();

const port = 3001;

const books = require("./routes/books");

app.listen(port, () => console.log("Server listening on port 3001"));

app.use("/books", books);
