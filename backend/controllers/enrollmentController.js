const enrollmentData = require('../models/enrollmentModel');
const userData = require('../models/userModel')

class enrollmentController {
    // [GET] /enrollment
    index(req, res) {
        enrollmentData.find({})
            .populate('course_id')
            .populate('student_id')
            .populate('progress')
            .populate('deleted_by')
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    error: 'enrollment_not_found',
                    message: 'Cannot get enrollment data'
                })
            })
    }

    // [GET] /enrollment/:course_id/:student_id
    show(req, res) {

        const courseId = req.params.course_id;
        const studentId = req.params.student_id;

        if (!courseId || !studentId) {
            return res.status(400).json({
                error: 'invalid_input',
                message: 'Cannot get the enrolled course and student information'
            })
        }

        enrollmentData.findOne({ course_id: courseId, student_id: studentId })
            .populate('course_id')
            .populate('student_id')
            .populate('progress')
            .populate('deleted_by')
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    error: 'enrollment_not_found',
                    message: 'Cannot get the requested enrollment'
                })
            })
    }

    // [POST] /enrollment/store
    store(req, res) {

        const { courseId, studentId } = req.body;

        if (!courseId || !studentId) {
            return res.status(400).json({
                error: 'invalid_input',
                message: 'Cannot get the enrolled course and student information'
            })
        }

        enrollmentData.findOne({ course_id: courseId, student_id: studentId })
            .then(existingEnrollment => {
                if (existingEnrollment) {
                    // If the student is already enrolled in the course
                    return res.status(409).json({
                        error: 'already_enrolled',
                        message: 'The student has already enrolled in this course.'
                    });
                }

                // If not enrolled, create the new enrollment
                const newEnroll = {
                    course_id: courseId,
                    student_id: studentId,
                    progress: [],
                    completed_datetime: null,
                    deleted_by: null,
                    deleted_at: null,
                };

                enrollmentData.create(newEnroll)
                    .then(createdEnroll => {
                        // Ensure the enrollment was successful
                        if (studentId !== createdEnroll.student_id.toString())
                            throw new Error('different student id');

                        // Add the new enrollment to the user's list of enrolled courses
                        userData.findByIdAndUpdate(
                            studentId,
                            { $push: { enrolled_courses: createdEnroll._id } }
                        )
                            .then(() => res.status(201).json(createdEnroll))
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: 'enrollment_not_saved',
                                    message: 'An error occurred while saving enrolled courses for the student.'
                                });
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'enrollment_not_created',
                            message: 'An error occurred while trying to enroll the course.'
                        });
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: 'server_error',
                    message: 'An error occurred while checking the enrollment status.'
                });
            });
    }

    // [PATCH] /enrollment/:course_id/:student_id/delete
    delete(req, res) {

        const courseId = req.params.course_id;
        const studentId = req.params.student_id;

        if (!courseId || !studentId) {
            return res.status(404).json({
                error: 'invalid_input',
                message: 'Wrong input or the student has not enrolled the course'
            })
        }

        enrollmentData.findOne({ course_id: courseId, student_id: studentId })
            .then(deletedEnroll => {

                if (req.body.role !== 'admin'
                    && req.body.userId !== deletedEnroll.creator._id.toString()
                ) {
                    return res.status(403).json({
                        error: 'unauthorized',
                        message: 'You are not allowed to kick the student'
                    });
                }

                if (req.body.deleted_at === null || req.body.deleted_by === null) {
                    return res.status(404).json({
                        error: 'missing_information',
                        message: 'Missing required information'
                    });
                }

                if (deletedEnroll.deleted_at !== null) {
                    return res.status(404).json({
                        error: 'enrollment_not_found',
                        message: 'Enrollment was deleted'
                    });
                }

                deletedEnroll.deleted_at = req.body.deleted_at;
                deletedEnroll.deleted_by = req.body.deleted_by;

                deletedEnroll.save()
                    .then((delEnroll) => {
                        // delete student's enrolled course
                        userData.findById(studentId)
                            .then(student => {
                                student.enrolled_courses.filter(e => e._id !== courseId);
                                student.save()
                                    .then(data => res.status(204).json(delEnroll))
                                    .catch(err => {
                                        console.log(err);
                                        res.status(500).json({
                                            error: 'enrolled_course_not_deleted',
                                            message: 'An error occurred while deleting the enrolled course of student'
                                        });
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(404).json({
                                    error: 'student_not_found',
                                    message: 'Cannot find the student'
                                });
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'enrollment_not_deleted',
                            message: 'An error occurred while deleting the enrollment'
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: 'server_error',
                    message: 'An error occurred while checking the enrollment status.'
                });
            });
    }

    // [PATCH] /enrollment/:course_id/:student_id  
    update(req, res) {

        const courseId = req.params.course_id;
        const studentId = req.params.student_id;

        if (!courseId || !studentId) {
            return res.status(400).json({
                error: 'invalid_input',
                message: 'Cannot get the enrolled course and student information'
            })
        }

        enrollmentData.findOne({ course_id: courseId, student_id: studentId })
            .then(enrollData => {

                if (req.body.progress) enrollData.progress = req.body.progress; 
                if (req.body.completed_datetime) enrollData.completed_datetime = req.body.completed_datetime; 
                if (req.body.deleted_by) enrollData.deleted_by = req.body.deleted_by; 
                if (req.body.deleted_at) enrollData.deleted_at = req.body.deleted_at; 

                enrollData.save()
                    .then(data => res.status(204).json(data))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'enrollment_not_updated',
                            message: 'An error occurred while updating the enrollment'
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({
                    error: 'enrollment_not_found',
                    message: 'Cannot find the enrollment'
                });
            });
    }

    // [PATCH] /enrollment/:course_id/:student_id/complete - mark a course as completed 
    updateComplete(req, res) {

        const completedTime = req.body.completed_datetime; 

        if (!completedTime) {
            return res.status(404).json({
                error: 'invalid_input',
                message: 'Wrong input'
            })
        }

        enrollmentData.findOne({ course_id: courseId, student_id: studentId })
            .then(enrollData => {
                enrollData.completed_datetime = completedTime;
                enrollData.save()
                    .then(data => res.status(204).json(data))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: 'course_not_completed',
                            message: 'An error occurred while updating the completed courses'
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({
                    error: 'enrollment_not_found',
                    message: 'Cannot find the enrollment'
                });
            });
    }

}

module.exports = new enrollmentController(); 
