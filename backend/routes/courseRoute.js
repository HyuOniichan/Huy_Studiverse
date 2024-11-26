const express = require('express'); 
const router = express.Router(); 

const courseController = require('../controllers/courseController'); 
const lessonController = require('../controllers/lessonController'); 

router.get(`/:id/lesson/:order`, lessonController.showOneLesson); 
router.get(`/:id/lesson`, lessonController.showLessons); 
router.get(`/:id`, courseController.showOne); 
router.get(`/`, courseController.show); 

module.exports = router; 
