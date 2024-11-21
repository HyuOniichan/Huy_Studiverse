const mongoose = require('mongoose'); 

const enrollmentSchema = new mongoose.Schema({
    course_id: mongoose.Schema.Types.ObjectId, 
    student_id: mongoose.Schema.Types.ObjectId, 
    progress: Number, 
    completed_datetime: Date
}, {
    timestamps: true
})

module.exports = mongoose.model('Enrollment', enrollmentSchema); 
