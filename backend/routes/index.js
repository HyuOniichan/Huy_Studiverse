const authRoute = require('./authRoute');
const { authenticate, userRole, authRole } = require('../middlewares/authenticate');

function route(app) {

    app.use(`/auth`, authRoute);

    app.use(`/admin`, authenticate, authRole(userRole.admin), (req, res) => {
        console.log(req.body)
        res.send('Admin page')
    })

    app.use(`/`, (req, res) => res.send('running'));

}

module.exports = route; 
