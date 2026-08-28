require("dotenv").config();

const path = require("path");
const express = require("express");
const app = require("./api/index");

const PORT = process.env.PORT || 3000;

// The serverless handler is mounted under /api. Static frontend is served locally.
const local = express();
local.use(express.static(path.join(__dirname, "public")));
local.use("/api", app);

local.listen(PORT, "0.0.0.0", () => {
  console.log(`AlightPRO berjalan di http://localhost:${PORT}`);
});
