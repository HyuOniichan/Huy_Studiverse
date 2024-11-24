const courseData = require('../models/courseModel')

class courseController {
    // [GET] /course
    show(req, res) {
        courseData.find({})
            .then(data => res.status(200).json(data))
            .catch(() => res.status(400).json({
                error: 'courses_not_found', 
                message: 'Cannot find requested courses'
            }))
    }
    
}

module.exports = new courseController(); 
