const courseData = require('../models/courseModel')
const lessonData = require('../models/lessonModel')

class courseController {
    // [GET] /course
    show(req, res) {
        courseData.find({}).populate('lessons').populate('creator')
            .then(data => res.status(200).json(data))
            .catch(() => res.status(400).json({
                error: 'courses_not_found',
                message: 'Cannot get courses'
            }))
    }

    // [GET] /course/:id
    showOne(req, res) {
        courseData.findById(req.params.id).populate('lessons').populate('creator')
            .then(data => res.status(200).json(data))
            .catch(() => {
                res.status(400).json({
                    error: 'course_not_found',
                    message: 'Cannot find the requested course'
                })
            })
    }

}

module.exports = new courseController(); 
