const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use("/openai", require("./routes/openRoutes"));

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
