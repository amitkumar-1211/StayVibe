// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const userRouter = require("./router/userRouter")
const hostRouter = require("./router/hostRouter")
const rootDir = require("./utils/pathUtil");

const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});