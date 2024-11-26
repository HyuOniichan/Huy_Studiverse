const courseData = require('../models/courseModel')

class lessonController {
    // [GET] /course/:id/lesson
    showLessons(req, res) {
        courseData.findById(req.params.id).populate('lessons')
            .then(course => res.status(200).json(course.lessons))
            .catch(() => res.status(400).json({
                error: 'lessons_not_found',
                message: 'Cannot get lessons'
            }))
    }

    // [GET] /course/:id/lesson/:order
    showOneLesson(req, res) {
        courseData.findById(req.params.id).populate('lessons')
            .then(course => {
                const lesson = course.lessons.find(ls => ls.order == req.params.order); 
                if (lesson) res.status(200).json(lesson);
                    else throw new Error();
            })
            .catch(() => res.status(400).json({
                error: 'invalid_id', 
                message: 'Cannot find requested course'
            }))
    }

}

module.exports = new lessonController(); 
