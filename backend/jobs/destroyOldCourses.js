const courseModel = require('../models/courseModel')

// Handle delete permanently courses in trash for over 30 days
function permanentDeleteCourses(delayDays = 30) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() - delayDays);

    courseModel.deleteMany({ deleted_at: { $ne: null, $lt: deadline } })
        .then(() => console.log(`Destroyed all expired courses`))
        .catch(err => console.log(err))
}

module.exports = permanentDeleteCourses; 
