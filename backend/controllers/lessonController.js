const courseData = require('../models/courseModel')

class lessonController {
    // [GET] /course/:id/lesson
    showLessons(req, res) {
        if (req.params && req.params.id) {
            courseData.findById(req.params.id).populate('lessons')
                .then(course => res.status(200).json(course.lessons))
                .catch(() => res.status(400).json({
                    error: 'lessons_not_found',
                    message: 'Cannot get lessons'
                }))
        }
    }

    // [GET] /course/:id/lesson/:order
    showOneLesson(req, res) {
        if (req.params && req.params.id) {
            courseData.findById(req.params.id).populate('lessons')
                .then(course => {
                    const lesson = course.lessons.find(ls => ls.order == req.params.order);
                    if (!lesson || lesson === null) throw new Error(); 
                    else return res.status(200).json(lesson);
                })
                .catch(() => res.status(400).json({
                    error: 'invalid_id',
                    message: 'Cannot find requested course'
                }))
        }
    }

}

module.exports = new lessonController(); 
