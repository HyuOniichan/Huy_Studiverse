const cron = require('node-cron');
const destroyOldCourses = require('./destroyOldCourses');

// Handle delete permanently courses in trash over 30 days, at 00:00 everyday
const destroyOldCoursesJob = cron.schedule('0 0 * * *', () => {
    destroyOldCourses(30);
});

function startBackgroundJobs() {
    destroyOldCoursesJob.start();
}

module.exports = startBackgroundJobs; 
