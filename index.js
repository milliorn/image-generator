const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use("/openai", require("./routes/openRoutes"));

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
