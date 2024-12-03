const express = require('express'); 
const router = express.Router(); 

const courseController = require('../controllers/courseController'); 
const lessonController = require('../controllers/lessonController'); 
const { authenticate, userRole, authRole } = require('../middlewares/authenticate'); 

router.post(`/store`, authenticate, authRole([userRole.teacher, userRole.admin]), courseController.store); 
router.get(`/:id/lesson/:order`, authenticate, lessonController.showOneLesson); 
router.get(`/:id/lesson`, authenticate, lessonController.showLessons); 
router.get(`/:id`, courseController.showOne); 
router.get(`/`, courseController.show); 

module.exports = router; 
