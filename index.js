const express = require('express');
const path = require('path');
//const url = "mongodb://localhost:27017/Users"
const app = express();
const mongoose = require('mongoose');
const routes = require('./router');

// const url =require("./public/config/keys").MongoURI;
const db = require('./public/config/keys').MongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',routes);

  
app.listen(3000);