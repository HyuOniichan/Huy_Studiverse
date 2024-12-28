const courseData = require('../models/courseModel')
const lessonData = require('../models/lessonModel')

class lessonController {
    // [GET] /course/:id/lesson
    index(req, res) {
        if (req.params && req.params.id) {
            courseData.findById(req.params.id).populate('lessons')
                .then(course => {
                    // sort the lessons by 'order' field
                    const [...lessons] = course.lessons;
                    lessons.sort((a, b) => a.order - b.order);
                    res.status(200).json(lessons);
                    // res.status(200).json(course.lessons);
                })
                .catch(() => res.status(400).json({
                    error: 'lessons_not_found',
                    message: 'Cannot get lessons'
                }))
        }
    }

    // [GET] /course/:id/lesson/:lesson_id
    show(req, res) {
        if (req.params && req.params.id) {
            courseData.findById(req.params.id).populate('lessons')
                .then(course => {
                    const lesson = course.lessons.find(ls => ls._id == req.params.lesson_id);
                    if (!lesson || lesson === null) throw new Error();
                    else return res.status(200).json(lesson);
                })
                .catch(() => res.status(400).json({
                    error: 'invalid_id',
                    message: 'Cannot find requested course or lesson'
                }))
        }
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
        res.json(req.body);
    }

}

module.exports = new lessonController(); 
