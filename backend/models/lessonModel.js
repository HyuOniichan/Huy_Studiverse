const mongoose = require('mongoose');

const lessonModel = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    thumbnail: String, 
    video_url: String, 
    content: String, 
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, 
    order: Number, 
}, {
    timestamps: true
})

module.exports = mongoose.model('Lesson', lessonModel); 
