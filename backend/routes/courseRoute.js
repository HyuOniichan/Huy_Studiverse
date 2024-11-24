const express = require('express'); 
const router = express.Router(); 

const courseController = require('../controllers/courseController'); 

router.get(`/`, courseController.show); 

module.exports = router; 
