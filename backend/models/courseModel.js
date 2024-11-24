const mongoose = require('mongoose');

const courseModel = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: String,
    thumbnail: String,
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Course', courseModel); 
