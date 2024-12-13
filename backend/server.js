// import 
require('dotenv').config(); 
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 
const cron = require('node-cron'); 
const app = express(); 
const route = require('./routes/'); 
const startBackgroundJobs = require('./jobs'); 

// middleware 
app.use(express.json()); 
app.use(cors({
    credentials: true, 
    origin: ['http://localhost:3000']
})); 
app.use(cookieParser()); 

// routes
route(app); 

// background jobs
startBackgroundJobs();

// connect to database 
mongoose.connect(process.env.MONGODB_URI) 
    .then(() => console.log('Connected to database')) 
    .catch(error => console.log(error)); 

// run app
app.listen(process.env.PORT, () => console.log(`Listening at port ${process.env.PORT}`))
