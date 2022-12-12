const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use("/openai", require("./routes/openAiRoutes"));

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
