const courseData = require('../models/courseModel')
const lessonData = require('../models/lessonModel')
const userData = require('../models/userModel')

class courseController {
    // [GET] /course
    show(req, res) {
        courseData.find({ deleted_at: null }).populate('lessons').populate('creator')
            .then(data => res.status(200).json(data))
            .catch(() => res.status(400).json({
                error: 'courses_not_found',
                message: 'Cannot get courses'
            }))
    }

    // [GET] /course/deleted
    showDeleted(req, res) {
        courseData.find({ deleted_at: { $ne: null } })
            .populate('lessons')
            .populate('creator')
            .populate('deleted_by')
            .then(data => {
                // check accessibility 
                const filteredData = data.filter(e => {
                    return (
                        req.body.role === 'admin'
                        || req.body.userId === e.creator._id.toString()
                        || (deleted_by && req.body.userId === e.deleted_by.toString())
                    )
                })

                if (filteredData.length > 0) {
                    return res.status(200).json(filteredData);
                }

                // No courses accessible to user 
                return res.status(403).json({
                    error: 'no_access_to_deleted_courses',
                    message: 'You do not have access to view deleted courses'
                });

            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    error: 'courses_not_found',
                    message: 'Cannot get courses'
                })
            })
    }

    // [GET] /course/:id
    showOne(req, res) {
        courseData.findById(req.params.id).populate('lessons').populate('creator').populate('deleted_by')
            .then(data => {
                // If course isn't deleted, show to everyone
                if (data.deleted_at === null) {
                    return res.status(200).json(data);
                }

                // If course is deleted, only show for admin & who created/deleted it
                if (req.body.role === 'admin'
                    || req.body.userId === data.creator._id.toString()
                    || (deleted_by && req.body.userId === data.deleted_by.toString())
                ) {
                    return res.status(200).json(data)
                }

                // Dafault case (e.g. student try to access deleted course)
                res.status(403).json({
                    error: 'course_deleted',
                    message: 'Course was deleted by admin or the owner of this course'
                })
            })
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

    // [PATCH] /:id/delete - soft delete course 
    delete(req, res) {
        const deletedId = req.params.id;
        courseData.findById(deletedId)
            .then(deletedCourse => {

                if (req.body.role !== 'admin' 
                    && req.body.userId !== deletedCourse.creator._id.toString()
                ) {
                    return res.status(403).json({
                        error: 'unauthorized',
                        message: 'You are not allowed to delete this course'
                    });
                }
                
                if (req.body.deleted_at === null || req.body.deleted_by === null) {
                    return res.status(404).json({
                        error: 'missing_information',
                        message: 'Missing required information'
                    });
                }

                if (deletedCourse.deleted_at !== null) {
                    return res.status(404).json({
                        error: 'course_not_found',
                        message: 'Course has already been in trash'
                    });
                }

                deletedCourse.deleted_at = req.body.deleted_at;
                deletedCourse.deleted_by = req.body.deleted_by;

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

    // [PATCH] /:id/restore - restore course in trash 
    restore(req, res) {
        courseData.findById(req.params.id)
            .then(deletedCourse => {

                if (req.body.userId !== 'admin' 
                    && req.body.userId !== deletedCourse.deleted_by.toString()
                ) {
                    return res.status(403).json({
                        error: 'unauthorized',
                        message: 'You are not allowed to restore this course'
                    });
                }

                if (deletedCourse.deleted_at === null) {
                    return res.status(404).json({
                        error: 'course_not_found',
                        message: 'Course has not been in trash'
                    });
                }

                deletedCourse.deleted_at = null;
                deletedCourse.deleted_by = null;

                deletedCourse.save()
                    .then((data) => res.status(204).json(data))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'course_not_restored',
                            message: 'An error occurred while restoring the course'
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
