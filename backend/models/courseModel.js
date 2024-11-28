const mongoose = require('mongoose');

const courseModel = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: String,
    thumbnail: String,
    tags: [String], 
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Course', courseModel); 
