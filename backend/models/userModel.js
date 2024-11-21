const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: 3, 
        maxlength: 30
    }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    role: {
        type: String, 
        enum: ['admin', 'guest', 'student', 'teacher'], 
        default: 'student'
    }, 
    avatar: String, 
    about: String, 
    enrolled_courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }], 
    created_courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }], 
}, {
    timestamps: true 
})

module.exports = mongoose.model('User', userSchema);
