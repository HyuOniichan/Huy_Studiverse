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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

const allowedOrigins = [
    "http://localhost:3000", 
    "https://huy-studiverse.vercel.app", 
]
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) callback(null, true) 
        else callback(new Error('Not allowed by CORS'), false) 
    }, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
})); 

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
