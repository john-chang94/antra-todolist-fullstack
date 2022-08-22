const express = require("express");
const app = express();
const cors = require("cors");

const port = 5000;
const db = require("./db");

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  const query = `SELECT * FROM todos`;

  db.query(query, (err, data) => {
    if (err) {
      return console.log("error" + err);
    }
    res.status(200).json({
      success: true,
      data,
    });
  });
});

app.post("/todos", (req, res) => {
  const { content } = req.body;
  const query = `
    INSERT INTO todos (content)
    VALUES (?)
  `;

  db.query(query, [content], (err, data) => {
    if (err) {
      return console.log("error" + err);
    }
    res.status(201).json({
      success: true,
    });
  });
});

app.delete("/todos/:t_id", (req, res) => {
  const { t_id } = req.params;
  const query = `
    DELETE FROM todos
    WHERE t_id = ?
  `;

  db.query(query, [t_id], (err, data) => {
    if (err) {
      return console.log("error" + err);
    }
    res.status(200).json({
      success: true,
    });
  });
});

app.put("/todos/:t_id", (req, res) => {
  const { t_id } = req.params;
  const { content } = req.body;
  const query = `
    UPDATE TODOS
    SET content = ?
    WHERE t_id = ?
  `;

  db.query(query, [content, t_id], (err, data) => {
    if (err) {
      return console.log("error" + err);
    }
    res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
