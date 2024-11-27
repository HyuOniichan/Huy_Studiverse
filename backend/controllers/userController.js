const userData = require('../models/userModel');

class userController {
    // [GET] /user
    index(req, res) {
        const populatedPaths = (req.body.role === 'student')? 
            'enrolled_courses' : ['enrolled_courses', 'created_courses']
        if (req.body && req.body.userId) userData.findById(req.body.userId)
            .populate(populatedPaths)
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
                if (data === null) throw new Error();
                const { username, role } = data;
                return res.status(200).json({ username, role })
            })
            .catch(() => res.status(400).json({
                error: 'user_not_found',
                message: 'User not found'
            }))
    }

    // [GET] /user/all
    showAll(req, res) {
        userData.find({})
            .populate('enrolled_courses')
            .populate('created_courses')
            .then(data => {
                if (data === null) throw new Error();
                return res.status(200).json(data)
            })
            .catch(() => res.status(400).json({
                error: 'user_not_found',
                message: 'Cannot retrieve users data'
            }))
    }
}

module.exports = new userController(); 
