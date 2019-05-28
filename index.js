const express = require("express");

const server = express();

const db = require("./data/hubs-model");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello from Web 19");
});

server.get("/now", (req, res) => {
  res.send(Date());
});

server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({ message: "error getting hubs" });
    });
});

server.post("/hubs", (req, res) => {
  const hubInfo = req.body;
  db.add(hubInfo)
    .then(hub => {
      console.log(hub);
      res.status(200).json(hub);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding hub" });
    });
});

server.delete("/hubs/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(deleted => {
      res.send(204).end();
    })
    .catch(err => {
      res.send(500).json({ message: "error deleting hub" });
    });
});

server.put("/hubs/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  console.log(id, changes);

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "hub not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error updating the hub." });
    });
});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
