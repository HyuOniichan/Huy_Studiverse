const userData = require('../models/userModel');

class userController {
    // [GET] /user
    index(req, res) {
        if (req.body && req.body.userId) userData.findById(req.body.userId)
            .then(data => {
                if (data === null) throw new Error();
                const { password, ...currentUser } = data.toObject();
                console.log(currentUser);
                return res.status(200).json(currentUser)
            })
            .catch(() => res.status(400).json({
                error: 'user_not_found',
                message: 'Cannot access to current user'
            }))
    }

    // [GET] /user/:username
    show(req, res) {
        userData.findOne({ username: req.params.username })
            .then(data => {
                console.log(data);
                if (data === null) throw new Error();
                const { username, role } = data;
                return res.status(200).json({ username, role })
            })
            .catch(() => res.status(400).json({
                error: 'user_not_found',
                message: 'User not found'
            }))
    }
}

module.exports = new userController(); 
