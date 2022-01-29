const app = require("express")();
const fs = require("fs");
const { dbPath } = require("./config");
let book = {};

const port = 3001;

app.listen(port, () => console.log("Server listening on port 3001"));

app.get("/books", (req, res) => {
  res.sendFile(process.cwd() + dbPath);
});

app.get("/books/:id", (req, res) => {
  fs.res.sendFile(process.cwd() + dbPath);
});

app.post("/books/create", (req, res) => {
  book = JSON.stringify({
    id: 3,
    title: "Ships",
    author: "Patryk Stoch",
  });

  fs.writeFileSync(`${process.cwd()}/${dbPath}`, book, { flag: "a+" });

  res.json(book);
});

app.delete("/books/:id", (req, res) => {});

app.put("/books/:id", (req, res) => {});
