const { generateImage } = require("../controllers/openAiController");

// https://expressjs.com/
const express = require("express");
// https://expressjs.com/en/guide/routing.html#express-router
const router = express.Router();
// https://expressjs.com/en/5x/api.html#router.METHOD
router.post("/generateimage", generateImage);

module.exports = router;
