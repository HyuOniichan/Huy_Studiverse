const express = require('express'); 
const router = express.Router(); 

const userController = require('../controllers/userController'); 
const { authenticate, userRole, authRole } = require('../middlewares/authenticate'); 

// Admin - get all users 
router.get(`/all`, authenticate, authRole(userRole.admin), userController.showAll)

// Find user with username
router.get(`/:username`, userController.show)

// Return current user
router.get(`/`, authenticate, userController.index)

module.exports = router; 
