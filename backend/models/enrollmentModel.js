const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    progress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    completed_datetime: { type: Date, default: null }, 
    deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, 
    deleted_at: { type: Date, default: null }
}, {
    timestamps: true
})

module.exports = mongoose.model('Enrollment', enrollmentSchema); 
