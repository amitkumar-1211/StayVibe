// Core Module
const path = require('path');

// Load project settings before reading them from process.env.
require('node:process').loadEnvFile(path.join(__dirname, '.env'));

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = process.env.MONGODB_URI;
if (!DB_PATH) {
  throw new Error('MONGODB_URI is not set. Add it to your .env file.');
}

//Local Module
const storeRouter = require("./router/storeRouter")
const hostRouter = require("./router/hostRouter")
const authRouter=require("./router/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'Sessions'
});

app.use(express.urlencoded());
app.use(session({
  secret:"Bast travel apps",
  resave: false,
  saveUninitialized: false,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(express.static(path.join(rootDir, 'public')));
app.use(storeRouter);
app.use(authRouter);
app.use("/host", (req, res, next) =>{
  if(req.isLoggedIn){
    next();
  } else{
    res.redirect("/Login");
  }
});
app.use("/host", hostRouter);


app.use(errorsController.pageNotFound);

const PORT = process.env.PORT || 3000;
mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
 });
}).catch(err => {
  console.log('Error while connecting to Mongo', err);
});
