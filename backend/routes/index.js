const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const courseRoute = require('./courseRoute');
const enrollmentRoute = require('./enrollmentRoute');

function route(app) {
    const prefix = `/api/v1`

    app.use(`${prefix}/auth`, authRoute);
    app.use(`${prefix}/user`, userRoute);
    app.use(`${prefix}/course`, courseRoute);
    app.use(`${prefix}/enrollment`, enrollmentRoute);
}

module.exports = route; 
