const userData = require('../models/userModel');

class userController {
    // [GET] /
    show(req, res) {
        res.send(req.body)
    }
}

module.exports = new userController(); 
