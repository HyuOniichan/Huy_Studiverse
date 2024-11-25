const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const courseRoute = require('./courseRoute');
const { authenticate, userRole, authRole } = require('../middlewares/authenticate');

function route(app) {

    const prefix = `/api/v1`

    app.use(`${prefix}/auth`, authRoute);
    app.use(`${prefix}/course`, courseRoute);
    app.use(`${prefix}/user`, userRoute);

    // test authen
    app.use(`${prefix}/admin`, authenticate, authRole(userRole.admin), (req, res) => {
        console.log(req.body)
        res.send('Admin page')
    })


}

module.exports = route; 
