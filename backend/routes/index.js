const authRoute = require('./authRoute');
const { authenticate, userRole, authRole } = require('../middlewares/authenticate');

function route(app) {

    const prefix = `/api/v1`

    app.use(`${prefix}/auth`, authRoute);

    app.use(`${prefix}/admin`, authenticate, authRole(userRole.admin), (req, res) => {
        console.log(req.body)
        res.send('Admin page')
    })

    app.use(`/`, (req, res) => res.send('running'));

}

module.exports = route; 
