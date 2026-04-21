const express = require("express");
const app = express();

const port = 8080;

app.get("/", (req, res) => {
  res.send("Yo");
});

app.listen(port, () => {
  `Server started on port ${port}`;
});
