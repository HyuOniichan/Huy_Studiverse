const courseData = require('../models/courseModel')
const lessonData = require('../models/lessonModel')
const userData = require('../models/userModel')

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
        const thumbnailPlacehoder = '/images/placeholder_image.png'

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
            thumbnail: thumbnail || thumbnailPlacehoder,
            tags: tags || [],
            creator,
            lessons: lessons || []
        }

        // create new course & save new course to creator's created_courses field 
        courseData.create(newCourse)
            .then(createdCourse => {
                if (creator !== createdCourse.creator.toString())
                    throw new Error('different creator id');
                if (creator) {
                    userData.findByIdAndUpdate(
                        creator,
                        { $push: { created_courses: createdCourse._id } }
                    )
                        .then(() => res.status(201).json(createdCourse))
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: 'course_not_created',
                                message: 'An error occurred while creating the course'
                            });
                        })

                } else {
                    throw new Error('creator not found');
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: 'course_not_created',
                    message: 'An error occurred while creating the course'
                })
            })
    }

    // [PUT] /:id/delete - soft delete course 
    delete(req, res) {
        const deletedId = req.params.id;
        courseData.findById(deletedId)
            .then(deletedCourse => {
                deletedCourse.deleted_at = new Date();
                deletedCourse.save()
                    .then((data) => res.status(204).json(data))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'course_not_deleted',
                            message: 'An error occurred while deleting the course'
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({
                    error: 'course_not_found',
                    message: 'Cannot find the course'
                });
            })
    }

}

module.exports = new courseController(); 
