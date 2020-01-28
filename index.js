const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();

app.use(bodyParser.json());
const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "config"
});
// connect database
connect.connect((err, res) => {
  if (err) throw err;
  console.log("Database connected ...");
});

// Route
app.get("/", (req, res) => {
  res.send({ message: "Home" });
});

//get method all
app.get("/users", function(req, res) {
  connect.query("SELECT * FROM user", (err, rows, fields) => {
    if (err) throw err;
    res.send({
      users: rows,
      message: "Successfully get data!"
    });
  });
});

//get method single
app.get("/users/:id", function(req, res) {
  const id = req.params.id;
  connect.query(
    "SELECT * FROM user WHERE user_id = ?",
    id,
    (err, rows, fields) => {
      if (err) throw err;
      res.send({
        users: rows,
        message: "Successfully get data!"
      });
    }
  );
});
//Post
app.post("/users/", function(req, res) {
  const data = req.body;
  connect.query("INSERT INTO user SET ?", data, (err, rows, fields) => {
    if (err) throw err;
    res.send({
      message: "Data Successfully added"
    });
  });
});

//PATCH
app.patch("/users/:id", function(req, res) {
  const id = req.params.id;
  const { FirstName, LastName } = req.body;
  connect.query(
    "UPDATE user SET FirstName = ?, LastName = ? WHERE user_id = ?",
    [FirstName, LastName, id],
    (err, rows, fields) => {
      if (err) throw err;
      res.send({
        result: rows,
        message: "Successfully Update data!"
      });
    }
  );
});
//DELETE method single
app.delete("/users/:id", function(req, res) {
  const id = req.params.id;
  connect.query(
    "DELETE FROM user WHERE user_id = ?",
    id,
    (err, rows, fields) => {
      if (err) throw err;
      res.send({
        result: rows,
        message: "Successfully get data!"
      });
    }
  );
});
// start to running server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running at Port ${port}`);
});
