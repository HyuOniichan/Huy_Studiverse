const express = require('express'); 
const router = express.Router(); 

const userController = require('../controllers/userController'); 
const { authenticate, userRole, authRole } = require('../middlewares/authenticate'); 

router.get(`/`, authenticate, userController.show)

module.exports = router; 
