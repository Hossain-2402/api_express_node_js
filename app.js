const express =  require("express");  // import express	
const app = express(); // make app using EXPRESS
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const router = express();

const morgan = require('morgan');

const products = require("./api/routs/products");
const users = require("./api/routs/user");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));
app.use('/uploads',express.static('uploads'))

const mongoURI = "mongodb+srv://hossainieofficial:demo-pass@cluster0.szanx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI,{})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Error connecting to MongoDB:'));


router.get("/",(req,res)=>{
  res.status(200).json({ message : "new message" })
});

app.use("/products",products);
app.use("/users",users);



app.use('/.netlify/functions/index', router); 
module.exports.handler = serverless(app);


module.exports = app;

