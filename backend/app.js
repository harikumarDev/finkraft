const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "1mb",
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
  });
});

module.exports = app;
