const express = require('express'); 
const router = express.Router(); 

const courseController = require('../controllers/courseController'); 
const lessonController = require('../controllers/lessonController'); 
const { authenticate, userRole, authRole } = require('../middlewares/authenticate'); 

// POST 
router.post(`/store`, authenticate, authRole([userRole.teacher, userRole.admin]), courseController.store); 
router.post(`/:id/lesson/store`, authenticate, authRole([userRole.teacher, userRole.admin]), lessonController.store); 

// PATCH
router.patch(`/:id/lesson/:lesson_id/delete`, authenticate, authRole([userRole.teacher, userRole.admin]), lessonController.delete); 
router.patch(`/:id/lesson/:lesson_id/restore`, authenticate, authRole([userRole.teacher, userRole.admin]), lessonController.restore); 
router.patch(`/:id/lesson/:lesson_id`, authenticate, authRole([userRole.teacher, userRole.admin]), lessonController.update); 
router.patch(`/:id/delete`, authenticate, authRole([userRole.teacher, userRole.admin]), courseController.delete); 
router.patch(`/:id/restore`, authenticate, authRole([userRole.teacher, userRole.admin]), courseController.restore); 
router.patch(`/:id`, authenticate, authRole([userRole.teacher, userRole.admin]), courseController.update);

// GET 
router.get(`/deleted`, authenticate, courseController.showDeleted); 
router.get(`/:id/lesson/deleted`, authenticate, lessonController.showDeleted); 
router.get(`/:id/lesson/:lesson_id`, authenticate, lessonController.show); 
router.get(`/:id/lesson`, authenticate, lessonController.index); 
router.get(`/:id`, authenticate, courseController.show); 
router.get(`/`, courseController.index); 

module.exports = router; 
