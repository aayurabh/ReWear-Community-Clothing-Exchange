const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
