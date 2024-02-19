const express = require("express");
const port = 3000;
const app = express();
app.use(express.json());

const notes = {};
let nextId = 1;

app.get("/", (req, res) => {
  res.send(Object.values(notes));
});

app.post("/", (req, res) => {
  const id = nextId++;
  const { content } = req.body;
  notes[id] = { id, content };
  res.status(201).send(notes[id]);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const note = notes[id];
  if (note) {
    res.send(note);
  } else {
    res.status(404).send({ error: "note not found" });
  }
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  if (notes[id]) {
    notes[id].content = content;
    res.send(notes[id]);
  } else {
    res.status(404).send({ error: "note not found" });
  }
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (notes[id]) {
    delete notes[id];
    res.status(204).send();
  } else {
    res.status(404).send({ error: "note not found" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
