const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || dotenv.PORT || 5000;
const app = express();

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
