// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-home.html'));
})

hostRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'homeAdding.html'));
})

module.exports = hostRouter;
