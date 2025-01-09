const express = require('express'); 
const router = express.Router(); 

const enrollmentController = require('../controllers/enrollmentController'); 
const { authenticate, userRole, authRole } = require('../middlewares/authenticate'); 

router.post(`/store`, authenticate, enrollmentController.store);
router.patch(`/:course_id/:student_id/delete`, authenticate, authRole([userRole.teacher, userRole.admin]), enrollmentController.delete); 
router.patch(`/:course_id/:student_id/complete`, authenticate, authRole([userRole.teacher, userRole.admin]), enrollmentController.updateComplete); 
router.patch(`/:course_id/:student_id`, authenticate, authRole([userRole.teacher, userRole.admin]), enrollmentController.update); 
router.get(`/:course_id/:student_id`, authenticate, enrollmentController.show);
router.get(`/`, authenticate, authRole([userRole.admin]), enrollmentController.index);

module.exports = router; 
