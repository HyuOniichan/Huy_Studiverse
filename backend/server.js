require('dotenv').config(); 
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 
const PORT = 8000; 
const app = express(); 
const route = require('./routes/'); 

// middleware 
app.use(express.json()); 
app.use(cors({
    credentials: true, 
    origin: ['http://localhost:3000']
})); 
app.use(cookieParser()); 

// routes
route(app); 

// connect to database 
mongoose.connect(process.env.MONGODB_URI) 
    .then(() => console.log('Connected to database')) 
    .catch(error => console.log(error)); 

// run app
app.listen(PORT, () => console.log(`Listening at port ${PORT}`))
