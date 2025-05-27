const express = require("express");
const app = express();
const serverless = require("serverless-http");

app.use(express.json());

// Sample route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is live on Vercel 🎉" });
});

module.exports = serverless(app);
