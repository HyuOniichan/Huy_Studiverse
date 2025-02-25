const courseData = require('../models/courseModel')
const lessonData = require('../models/lessonModel')
const enrollmentData = require('../models/enrollmentModel')

class lessonController {
    // [GET] /course/:id/lesson - find course by :id and get all lessons
    index(req, res) {
        courseData.findById(req.params.id).populate('lessons')
            .then(course => {

                enrollmentData.findOne({
                    course_id: req.params.id,
                    student_id: req.body.userId
                })
                    .then(data => {

                        // student can see the course's lessons only if they enrolled 
                        if (req.body.role !== 'admin' && !data) return res.status(403).json({
                            error: 'unauthorized',
                            message: 'You have not enrolled the course'
                        });

                        const [...allLessons] = course.lessons;

                        // get available lessons 
                        const lessons = allLessons.filter(lesson => lesson.deleted_at === null);

                        // sort the lessons by 'order' field
                        lessons.sort((a, b) => a.order - b.order);

                        res.status(200).json(lessons);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({
                            error: 'enrollment_not_found',
                            message: 'Cannot get the requested enrollment'
                        })
                    })

            })
            .catch(() => res.status(404).json({
                error: 'lessons_not_found',
                message: 'Cannot get lessons'
            }))
    }

    // [GET] /course/:id/lesson/:lesson_id
    show(req, res) {
        courseData.findById(req.params.id).populate('lessons')
            .then(course => {
                const lesson = course.lessons.find(ls => ls._id == req.params.lesson_id);
                if (!lesson || lesson === null) throw new Error();
                else if (req.body.role === 'admin'
                    || req.body.userId === course.creator._id.toString()
                    || (lesson.deleted_by && req.body.userId === lesson.deleted_by.toString())
                ) {
                    return res.status(200).json(lesson)
                }
                res.status(403).json({
                    error: 'lesson_deleted',
                    message: 'Lesson was deleted by admin or the owner of this lesson'
                })
            })
            .catch(() => res.status(400).json({
                error: 'invalid_id',
                message: 'Cannot find the requested course or lesson'
            }))
    }

    // [GET] /course/:id/lesson/deleted
    showDeleted(req, res) {
        courseData.findById(req.params.id).populate('lessons')
            .then(course => {
                const [...allLessons] = course.lessons;

                // get lessons in trash
                const lessons = allLessons.filter(lesson => lesson.deleted_at !== null);

                res.status(200).json(lessons);
            })
            .catch(() => res.status(404).json({
                error: 'lessons_not_found',
                message: 'Cannot get lessons'
            }))
    }

    // [POST] /courses/:id/lesson/store
    store(req, res) {
        const { title, description, thumbnail, video_url, content, order } = req.body;
        const thumbnailPlacehoder = '/images/placeholder_image.png'

        if (!title) {
            return res.status(400).json({
                error: 'invalid_input',
                message: 'Title are required'
            })
        }

        const newLesson = {
            title,
            description: description || '...',
            thumbnail: thumbnail || thumbnailPlacehoder,
            video_url: video_url || 'free',
            content,
            course: req.params.id,
            order
        }

        // find course including the created lesson 
        courseData.findById(req.params.id)
            .then(course => {
                // create lesson 
                lessonData.create(newLesson)
                    .then(createdLesson => {
                        // update lessons field of the course 
                        course.lessons.push(createdLesson._id);
                        course.save()
                            .then(() => res.status(201).json(createdLesson))
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: 'course_not_updated',
                                    message: 'Cannot update the course with new lesson'
                                });
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'lesson_not_created',
                            message: 'An error occurred while creating the lesson'
                        });
                    })
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({
                    error: 'lesson_create_error',
                    message: `${err}`
                });
            })
    }

    // [PATCH] /course/:id/lesson/:lesson_id
    update(req, res) {
        lessonData.findById(req.params.lesson_id)
            .then(editedLesson => {

                if (req.body.role !== 'admin'
                    && req.body.userId !== editedLesson.creator._id.toString()
                ) {
                    return res.status(403).json({
                        error: 'unauthorized',
                        message: 'You are not allowed to update this lesson'
                    });
                }

                if (editedLesson.deleted_at !== null) {
                    return res.status(404).json({
                        error: 'lesson_not_found',
                        message: 'Lesson was deleted'
                    });
                }

                editedLesson.title = req.body.title;
                editedLesson.description = req.body.description;
                editedLesson.thumbnail = req.body.thumbnail;
                editedLesson.video_url = req.body.video_url;
                editedLesson.content = req.body.content;
                editedLesson.order = req.body.order;

                editedLesson.save()
                    .then((data) => res.status(204).json(data))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'lesson_not_edited',
                            message: 'An error occurred while editing the lesson'
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({
                    error: 'lesson_not_found',
                    message: 'Cannot find the lesson'
                });
            })
    }

    // [PATCH] /course/:id/lesson/:lesson_id/delete - soft delete lesson 
    delete(req, res) {
        lessonData.findById(req.params.lesson_id)
            .then(deletedLesson => {

                if (req.body.role !== 'admin'
                    && req.body.userId !== deletedLesson.creator._id.toString()
                ) {
                    return res.status(403).json({
                        error: 'unauthorized',
                        message: 'You are not allowed to delete this lesson'
                    });
                }

                if (req.body.deleted_at === null || req.body.deleted_by === null) {
                    return res.status(404).json({
                        error: 'missing_information',
                        message: 'Missing required information'
                    });
                }

                if (deletedLesson.deleted_at !== null) {
                    return res.status(404).json({
                        error: 'lesson_not_found',
                        message: 'Lesson has already been in trash'
                    });
                }

                deletedLesson.deleted_at = req.body.deleted_at;
                deletedLesson.deleted_by = req.body.deleted_by;

                deletedLesson.save()
                    .then((data) => res.status(204).json(data))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'lesson_not_deleted',
                            message: 'An error occurred while deleting the lesson'
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({
                    error: 'lesson_not_found',
                    message: 'Cannot find the lesson'
                });
            })
    }

    // [PATCH] /course/:id/lesson/:lesson_id/restore - restore lesson in trash 
    restore(req, res) {
        lessonData.findById(req.params.lesson_id)
            .then(deletedLesson => {

                if (req.body.role !== 'admin'
                    && req.body.userId !== deletedLesson.deleted_by.toString()
                ) {
                    return res.status(403).json({
                        error: 'unauthorized',
                        message: 'You are not allowed to restore this lesson'
                    });
                }

                if (deletedLesson.deleted_at === null) {
                    return res.status(404).json({
                        error: 'lesson_not_found',
                        message: 'Lesson has not been in trash'
                    });
                }

                deletedLesson.deleted_at = null;
                deletedLesson.deleted_by = null;

                deletedLesson.save()
                    .then((data) => res.status(204).json(data))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'lesson_not_restored',
                            message: 'An error occurred while restoring the lesson'
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({
                    error: 'lesson_not_found',
                    message: 'Cannot find the lesson'
                });
            })
    }

}

module.exports = new lessonController(); 
