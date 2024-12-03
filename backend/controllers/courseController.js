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

    // [POST] /course/store
    store(req, res) {
        const { title, creator, lessons, description, price, thumbnail, tags } = req.body;

        if (!title || !creator) {
            return res.status(400).json({
                error: 'invalid_input',
                message: 'Title and creator are required'
            })
        }

        const newCourse = {
            title,
            description: description || 'No description', 
            price: price || 'Free', 
            thumbnail: thumbnail || '', 
            tags: tags || [], 
            creator,
            lessons: lessons || []
        }

        courseData.create(newCourse)
            .then(data => res.status(201).json(data))
            .catch(() => {
                res.status(500).json({
                    error: 'course_not_created',
                    message: 'An error occurred while creating the course'
                })
            })
    }

}

module.exports = new courseController(); 
